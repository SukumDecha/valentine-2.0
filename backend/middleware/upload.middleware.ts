import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req: Request, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req: Request, file, cb) {
        const uuid = req.params.uuid || 'uuid_default';
        const timestamp = Date.now();
        const filename = `${uuid}-${timestamp}${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Check both file extension and mimetype
    const allowedExtensions = /\.(jpg|jpeg|png|gif|webp|HEIC|heic)$/i;
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/heic',
        'image/heif',
        'application/octet-stream' // Some devices send HEIC files with this mimetype
    ];

    if (!file.originalname.match(allowedExtensions) || !allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error('Only image files are allowed! (JPG, JPEG, PNG, GIF, WEBP, HEIC)'));
    }

    // Additional check for iOS devices that might send photos with incorrect extension
    if (file.mimetype === 'application/octet-stream' && !file.originalname.match(/\.(HEIC|heic)$/i)) {
        return cb(new Error('Invalid file type'));
    }

    cb(null, true);
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024 // 20MB limit
    }
});

export const handleFileUpload = upload.array("images", 10);