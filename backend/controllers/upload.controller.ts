import { Request, Response } from "express";
import { getDB } from "../database/database";
import path from "path";
import { uploadFileToMinio } from "../minio/utils";

export const uploadFiles = async (req: Request, res: Response): Promise<void> => {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        res.status(400).send('No files uploaded.');
        return;
    }

    try {
        const fileUrls: string[] = [];
        for (const file of req.files) {
            try {
                const objectName = `${req.params.slug}/${path.basename(file.filename)}`;
                const url = await uploadFileToMinio(file.path, objectName);
                fileUrls.push(url);
            } catch (error) {
                console.error(`Error processing file ${file.filename}:`, error);
            }
        }

        if (fileUrls.length === 0) {
            res.status(500).json({
                success: false,
                message: 'Failed to upload any images'
            });
            return;
        }

        const db = getDB().collection('users');
        const addImages = await db.updateOne(
            { uuid: req.params.slug },
            { $set: { images: fileUrls } }
        );

        if (addImages.modifiedCount === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Images uploaded successfully!',
            files: fileUrls,
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload images',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}