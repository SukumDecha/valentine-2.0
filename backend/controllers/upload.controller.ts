import { Response } from "express";
import { getDB } from "../database/database";
import fs from "fs";
import { uploadFileToMinio } from "../minio/utils";
import { CustomRequest } from "../types/express"; // Import the extended Request type

export const uploadFilesWithTexts = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        console.log('Starting upload process', {
            hasProcessedFiles: !!req.processedFiles,
            processedFilesCount: req.processedFiles?.length,
            hasTexts: !!req.body.texts,
            textsCount: req.body.texts?.length
        });

        if (!req.processedFiles || req.processedFiles.length === 0) {
            console.error('No processed files found');
            res.status(400).send("No files uploaded.");
            return;
        }

        if (!req.body.texts || !Array.isArray(req.body.texts)) {
            console.error('No texts array found');
            res.status(400).send("Texts array is required.");
            return;
        }

        if (req.processedFiles.length !== req.body.texts.length) {
            console.error('Mismatch between files and texts count', {
                filesCount: req.processedFiles.length,
                textsCount: req.body.texts.length
            });
            res.status(400).send("Number of files and texts must match.");
            return;
        }

        const imagesWithTexts: Array<{ url: string; text: string; id: number }> = [];

        for (let i = 0; i < req.processedFiles.length; i++) {
            try {
                const file = req.processedFiles[i];
                const text = req.body.texts[i];

                console.log(`Processing file ${i + 1}/${req.processedFiles.length}`, {
                    filename: file.filename
                });

                const objectName = `${req.params.uuid}/${file.filename}`;
                const url = await uploadFileToMinio(file.path, objectName);
                
                console.log(`Successfully uploaded to Minio: ${objectName}`);
                
                imagesWithTexts.push({
                    id: i,
                    url: url,
                    text: text,
                });

                // Clean up local file after successful upload
                fs.unlink(file.path, (err:any) => {
                    if (err) console.error(`Failed to delete temporary file: ${file.path}`, err);
                });

            } catch (error) {
                console.error(`Error processing file ${req.processedFiles[i].filename}:`, error);
            }
        }

        if (imagesWithTexts.length === 0) {
            console.error('No images were successfully processed and uploaded');
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
            console.error('User not found in database', { uuid: req.params.uuid });
            res.status(404).json({ message: "User not found" });
            return;
        }

        console.log('Successfully completed upload process', {
            uploadedCount: imagesWithTexts.length,
            uuid: req.params.uuid
        });

        res.status(200).json({
            success: true,
            message: "Images uploaded successfully!",
            files: imagesWithTexts,
        });
    } catch (error : any) {
        console.error("Upload error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to upload images",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};