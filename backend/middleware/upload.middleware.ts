import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import { console } from "inspector";

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
    console.log("Received file:", {
        mimetype: file.mimetype,
        size: file.size,
        name: file.originalname
    });
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|HEIC)$/i)) {
        return cb(new Error('Only image files are allowed!'));
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