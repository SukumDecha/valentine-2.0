// src/middleware/upload.middleware.ts
import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";

// Create dir if not exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to validate uploads
const fileFilter = (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
};

// Create multer middleware instance
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024 // 20MB limit
    }
});

// Export middleware handler
export const handleFileUpload = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const uploadMiddleware = upload.array("images", 10);
    
    uploadMiddleware(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                message: 'Upload error',
                error: err.message
            });
        } else if (err) {
            return res.status(400).json({
                message: 'Error uploading file',
                error: err.message
            });
        }
        next();
    });
};