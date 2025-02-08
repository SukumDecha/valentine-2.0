import minioClient, { BUCKET_NAME } from "./client";
import { unlink } from 'fs/promises';

// Initialize bucket
export async function initializeBucket(): Promise<void> {
    try {
        const exists = await minioClient.bucketExists(BUCKET_NAME);
        if (!exists) {
            await minioClient.makeBucket(BUCKET_NAME, "us-east-1");
            console.log(`Bucket "${BUCKET_NAME}" created.`);
        }
    } catch (error) {
        console.error("Error initializing bucket:", error);
        throw error;
    }
}

// Upload file and return presigned URL
export async function uploadFileToMinio(filePath: string, objectName: string): Promise<string> {
    try {
        // Upload to MinIO
        await minioClient.fPutObject(BUCKET_NAME, objectName, filePath, {});
        
        // Generate presigned URL
        const url = await minioClient.presignedGetObject(BUCKET_NAME, objectName, 24 * 60 * 60);
        
        // Clean up local file - with error handling for file deletion
        try {
            await unlink(filePath);
        } catch (unlinkError) {
            // If file doesn't exist, it might have been deleted by another upload
            console.log(`Note: File ${filePath} already deleted or doesn't exist`);
        }
        
        return url;
    } catch (error) {
        console.error("Error uploading file:", error);
        // Try to clean up if file exists
        try {
            await unlink(filePath);
        } catch (unlinkError) {
            // Ignore deletion errors
        }
        throw error;
    }
}
// Get presigned URL for existing file
export async function getPresignedUrl(objectName: string): Promise<string> {
    try {
        return await minioClient.presignedGetObject(BUCKET_NAME, objectName, 24 * 60 * 60);
    } catch (error) {
        console.error("Error generating presigned URL:", error);
        throw error;
    }
}

// Delete file from MinIO
export async function deleteFileFromMinio(objectName: string): Promise<void> {
    try {
        await minioClient.removeObject(BUCKET_NAME, objectName);
    } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }
}