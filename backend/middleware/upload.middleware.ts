import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB per file
const MAX_FILES = 10;

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
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|heic|HEIC)$/i)) {
        return cb(new Error('Only image files are allowed!'));
    }

    const files = req.files as Express.Multer.File[];
    if (files && files.length >= MAX_FILES) {
        return cb(new Error(`Maximum ${MAX_FILES} files allowed`));
    }

    cb(null, true);
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE, // 20MB per file
        files: MAX_FILES // Maximum number of files
    }
});

export const handleFileUpload = upload.array("images", MAX_FILES);