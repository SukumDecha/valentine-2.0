import { Request, Response } from "express";
import { getDB } from "../database/database";

export const uploadFiles = async (req: Request, res: Response): Promise<void> => {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        res.status(400).send('No files uploaded.');
        return;
    }
    const fileUrls =  req.files.map(file => file.filename)
    try {
        const db = getDB().collection('users');
        const addImages = await db.updateOne({uuid : req.params.slug}, {$set: {images: fileUrls}});
        if (addImages.modifiedCount === 0) {
            res.status(404).json({ message: "Url not correct" });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Images uploaded successfully!',
            files: fileUrls
        });
    } catch (error :any) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data || "Error upload images",
        });
    }
}

