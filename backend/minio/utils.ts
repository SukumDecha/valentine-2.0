import minioClient, { BUCKET_NAME, PUBLIC_ENDPOINT, PUBLIC_PORT } from "./client";
import { unlink } from 'fs/promises';

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

export function transformMinioUrl(url: string): string {
    // Replace internal Docker network URL with public URL
    return url.replace(/http:\/\/minio:9000/g, `http://${PUBLIC_ENDPOINT}:${PUBLIC_PORT}`);
}

export async function uploadFileToMinio(filePath: string, objectName: string): Promise<string> {
    try {
        await minioClient.fPutObject(BUCKET_NAME, objectName, filePath, {});
        const url = await minioClient.presignedGetObject(BUCKET_NAME, objectName, 24 * 60 * 60);
        const publicUrl = transformMinioUrl(url);
        
        try {
            await unlink(filePath);
        } catch (unlinkError) {
            console.log(`Note: File ${filePath} already deleted or doesn't exist`);
        } 
        return publicUrl;
    } catch (error) {
        console.error("Error uploading file:", error);
        try {
            await unlink(filePath);
        } catch (unlinkError) {
            // Ignore deletion errors
        }
        throw error;
    }
}

export async function getPresignedUrl(objectName: string): Promise<string> {
    try {
        const url = await minioClient.presignedGetObject(BUCKET_NAME, objectName, 24 * 60 * 60);
        return transformMinioUrl(url);
    } catch (error) {
        console.error("Error generating presigned URL:", error);
        throw error;
    }
}