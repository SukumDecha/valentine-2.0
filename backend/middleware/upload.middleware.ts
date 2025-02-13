import multer from "multer";
import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import sharp from "sharp";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.memoryStorage(); // Use memory storage for processing

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];
    
    if (!allowedMimes.includes(file.mimetype.toLowerCase())) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 25 * 1024 * 1024 // 25MB limit to accommodate HEIC conversion
    }
});

export const processUploadedFiles = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !Array.isArray(req.files)) {
        return next();
    }

    try {
        const processedFiles = await Promise.all(
            (req.files as Express.Multer.File[]).map(async (file) => {
                const uuid = req.params.uuid || 'uuid_default';
                const timestamp = Date.now();
                const filename = `${uuid}-${timestamp}.jpg`;
                const filepath = path.join(uploadsDir, filename);

                // Process image with Sharp
                await sharp(file.buffer)
                    .resize(2000, 2000, { // Max dimensions
                        fit: 'inside',
                        withoutEnlargement: true
                    })
                    .jpeg({ quality: 80 })
                    .toFile(filepath);

                return {
                    filename,
                    path: filepath,
                    buffer: file.buffer,
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size
                };
            })
        );

        req.processedFiles = processedFiles;
        next();
    } catch (error) {
        next(error);
    }
};

export const handleFileUpload = [
    upload.array("images", 10),
    processUploadedFiles
];