// controllers/upload.controller.ts
import { Request, Response } from "express";

export const uploadFiles = (req: Request, res: Response): void => {
    if (!req.files) {
        res.status(400).send('No files uploaded.');
        return;
    }
    console.log('Uploaded files:', req.files);

    res.status(200).send({
        message: 'Images uploaded successfully!',
        files: req.files,
    });
}
