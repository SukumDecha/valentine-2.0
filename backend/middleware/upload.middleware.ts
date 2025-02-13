import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.memoryStorage(); // Store files in memory to process before saving

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedExtensions = /\.(jpg|jpeg|png|gif|webp|HEIC|heic)$/i;
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/heic',
        'image/heif',
        'application/octet-stream'
    ];

    if (!file.originalname.match(allowedExtensions) || !allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error('Only image files are allowed! (JPG, JPEG, PNG, GIF, WEBP, HEIC)'));
    }

    if (file.mimetype === 'application/octet-stream' && !file.originalname.match(/\.(HEIC|heic)$/i)) {
        return cb(new Error('Invalid file type'));
    }

    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024 // 20MB limit
    }
});

export const handleFileUpload = async (req: Request, res: Response, next: NextFunction) => {
    upload.array("images", 10)(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });

        try {
            if (!req.files) return res.status(400).json({ error: "No files uploaded" });

            const files = req.files as Express.Multer.File[];
            const processedFiles: string[] = [];

            for (const file of files) {
                const uuid = req.params.uuid || 'uuid_default';
                const timestamp = Date.now();
                const newFilename = `${uuid}-${timestamp}.png`;
                const outputPath = path.join(uploadsDir, newFilename);

                await sharp(file.buffer)
                    .png({ quality: 90 })
                    .toFile(outputPath);

                processedFiles.push(newFilename);
            }

            res.status(200).json({ message: "Files uploaded successfully", files: processedFiles });
        } catch (error) {
            next(error);
        }
    });
};
