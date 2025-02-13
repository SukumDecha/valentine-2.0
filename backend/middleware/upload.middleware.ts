// 01d8f8beb5ee11bf358dcca5abb6bcd47d42140b
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { CustomRequest, ProcessedFile } from "../types/express";
import heicConvert from "heic-convert"; // This library can handle HEIC/HEIF formats

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    console.log('Received file:', {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size
    });

    // Updated MIME types to better handle iPhone images
    const allowedMimeTypes = new Set([
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/heic",
        "image/heif",
        "application/octet-stream",
        "image/jpg",
        "" // Some iPhone uploads might have empty MIME type
    ]);

    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic', '.heif']);

    // More permissive check for iPhone uploads
    const isAllowed = allowedExtensions.has(ext) || allowedMimeTypes.has(file.mimetype);
    
    if (!isAllowed) {
        console.log('File rejected:', { ext, mimetype: file.mimetype });
        return cb(new Error(`Invalid file type. Allowed types: ${Array.from(allowedExtensions).join(', ')}`));
    }

    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB limit
    },
});

const processImage = async (buffer: Buffer, outputPath: string): Promise<void> => {
    try {
        const ext = path.extname(outputPath).toLowerCase();

        if (ext === '.heic' || ext === '.heif') {
            // Handle HEIC/HEIF conversion
            const convertedBuffer = await heicConvert({
                buffer,
                format: "JPEG"
            });
            await sharp(convertedBuffer)
                .rotate() // Automatically rotate based on EXIF data
                .withMetadata() // Preserve metadata
                .jpeg({ quality: 85 }) // Convert to JPEG
                .toFile(outputPath);
        } else {
            // Regular processing for other formats
            await sharp(buffer, { failOnError: false })
                .rotate() // Automatically rotate based on EXIF data
                .withMetadata() // Preserve metadata
                .jpeg({ quality: 85 }) // Convert to JPEG first
                .toBuffer()
                .then(processedBuffer => 
                    sharp(processedBuffer)
                        .png({ quality: 90 })
                        .toFile(outputPath)
                );
        }
    } catch (error) {
        console.log('Error processing image:', error);
        throw error;
    }
};

export const handleFileUpload = (req: Request, res: Response, next: NextFunction) => {
    upload.array("images", 10)(req, res, async (err) => {
        if (err) {
            console.error("Multer error:", err);
            return res.status(400).json({ error: err.message });
        }

        try {
            if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
                return res.status(400).json({ error: "No files uploaded" });
            }

            const files = req.files as Express.Multer.File[];
            const processedFiles: ProcessedFile[] = [];

            for (const file of files) {
                try {
                    console.log(`Processing file: ${file.originalname}`);
                    
                    const uuid = req.params.uuid || "uuid_default";
                    const timestamp = Date.now();
                    const newFilename = `${uuid}-${timestamp}.png`;
                    const outputPath = path.join(uploadsDir, newFilename);

                    await processImage(file.buffer, outputPath);
                    
                    console.log(`Successfully processed: ${newFilename}`);
                    processedFiles.push({ filename: newFilename, path: outputPath });
                } catch (processError) {
                    console.error(`Failed to process ${file.originalname}:`, processError);
                }
            }

            if (processedFiles.length === 0) {
                throw new Error("No files were successfully processed");
            }

            (req as CustomRequest).processedFiles = processedFiles;
            next();
        } catch (error) {
            console.error("File processing error:", error);
            next(error);
        }
    });
};
