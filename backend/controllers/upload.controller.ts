import { Request, Response } from "express";

export const uploadFiles = (req: Request, res: Response): void => {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        res.status(400).send('No files uploaded.');
        return;
    }
    
    const uploadedFiles = req.files.map(file => ({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path
    }));

    console.log('uploadedFiles', uploadedFiles);

    res.status(200).json({
        message: 'Images uploaded successfully!',
        files: uploadedFiles
    });
}