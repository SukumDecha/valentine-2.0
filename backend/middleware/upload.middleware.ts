import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import { CustomRequest, ProcessedFile } from "../types/express";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Updated MIME types to better handle iPhone images
    const allowedMimeTypes = new Set([
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/heic",
        "image/heif",
        "application/octet-stream", // Some iOS versions send this for HEIC
        "image/jpg"
    ]);

    // Check file extension
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic', '.heif']);

    if (!allowedExtensions.has(ext) || !allowedMimeTypes.has(file.mimetype)) {
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
                    const uuid = req.params.uuid || "uuid_default";
                    const timestamp = Date.now();
                    const newFilename = `${uuid}-${timestamp}.png`;
                    const outputPath = path.join(uploadsDir, newFilename);

                    // Enhanced image processing with better error handling
                    await sharp(file.buffer, { failOnError: false })
                        .rotate() // Automatically rotate based on EXIF data
                        .withMetadata() // Preserve metadata
                        .png({ quality: 90 })
                        .toFile(outputPath);

                    processedFiles.push({ filename: newFilename, path: outputPath });
                } catch (processError) {
                    console.error(`Error processing file ${file.originalname}:`, processError);
                    // Try alternative processing for problematic files
                    try {
                        const sharpInstance = sharp(file.buffer, { 
                            failOnError: false,
                            density: 300 // Higher density for better quality
                        });
                        
                        // Force removal of animation data which can cause issues
                        await sharpInstance
                            .removeAlpha()
                            .jpeg()
                            .toBuffer();
                            
                        const uuid = req.params.uuid || "uuid_default";
                        const timestamp = Date.now();
                        const newFilename = `${uuid}-${timestamp}.png`;
                        const outputPath = path.join(uploadsDir, newFilename);
                        
                        await sharpInstance
                            .png({ quality: 90 })
                            .toFile(outputPath);
                            
                        processedFiles.push({ filename: newFilename, path: outputPath });
                    } catch (fallbackError) {
                        console.error(`Fallback processing failed for ${file.originalname}:`, fallbackError);
                        throw processError; // Re-throw the original error if fallback fails
                    }
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