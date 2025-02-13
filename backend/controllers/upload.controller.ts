import { Response } from "express";
import { getDB } from "../database/database";
import path from "path";
import { uploadFileToMinio } from "../minio/utils";
import { CustomRequest } from "../types/express"; // Import the extended Request type

export const uploadFilesWithTexts = async (req: CustomRequest, res: Response): Promise<void> => {
    if (!req.processedFiles || req.processedFiles.length === 0) {
        res.status(400).send("No files uploaded.");
        return;
    }

    if (!req.body.texts || !Array.isArray(req.body.texts)) {
        res.status(400).send("Texts array is required.");
        return;
    }

    if (req.processedFiles.length !== req.body.texts.length) {
        res.status(400).send("Number of files and texts must match.");
        return;
    }

    try {
        const imagesWithTexts: Array<{ url: string; text: string; id: number }> = [];

        for (let i = 0; i < req.processedFiles.length; i++) {
            try {
                const file = req.processedFiles[i];
                const text = req.body.texts[i];

                const objectName = `${req.params.uuid}/${file.filename}`;
                const url = await uploadFileToMinio(file.path, objectName);
                imagesWithTexts.push({
                    id: i,
                    url: url,
                    text: text,
                });
            } catch (error) {
                console.error(`Error processing file ${req.processedFiles[i].filename}:`, error);
            }
        }

        if (imagesWithTexts.length === 0) {
            res.status(500).json({
                success: false,
                message: "Failed to upload any images",
            });
            return;
        }

        const db = getDB().collection("users");
        const addImages = await db.updateOne(
            { uuid: req.params.uuid },
            { $set: { images: imagesWithTexts, template: req.body.template } }
        );

        if (addImages.modifiedCount === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Images uploaded successfully!",
            files: imagesWithTexts,
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to upload images",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
