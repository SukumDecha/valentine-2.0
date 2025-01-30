import { Request, Response } from "express";

export const uploadFiles = (req: Request, res: Response): void => {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        res.status(400).send('No files uploaded.');
        return;
    }

    // console.log('uploadedFiles', req.files.map(file => ({
    //     filename: file.filename,
    //     originalname: file.originalname,
    //     mimetype: file.mimetype,
    //     size: file.size,
    //     path: file.path
    // })));

    const fileUrls = req.files.map(file => file.path);

    res.status(200).json({
        success: true,
        message: 'Images uploaded successfully!',
        files: fileUrls
    });
}