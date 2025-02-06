import multer from "multer";
import path from "path";
import fs from "fs";
import {Request, Response, NextFunction} from "express";

// Create dir if not exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: function (req : Request, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req : Request, file, cb) {
        // Get the slug from request parameters
        const slug = req.params.slug || 'slug_default';
        const template = req.params.template || 'template_default';
        
        // Get the current count of files to append to filename
        const files = req.files as Express.Multer.File[];
        const fileCount =files.length;
        
        // Create filename with slug and counter
        const filename = `${slug}-image-${fileCount}${path.extname(file.originalname)}`;
        
        cb(null, filename);
    }
});

// File filter to validate uploads
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
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
export const handleFileUpload = (req: Request, res: Response, next: NextFunction) => {
    const uploadMiddleware = upload.array("images", 10);
    
    uploadMiddleware(req, res, (err : any) => {
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
