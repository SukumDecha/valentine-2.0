import minioClient, { BUCKET_NAME, PUBLIC_ENDPOINT, PUBLIC_PORT } from "./client";
import { unlink } from 'fs/promises';

export function getPublicUrl(objectName: string): string {
    return `https://${PUBLIC_ENDPOINT}/${BUCKET_NAME}/${objectName}`;
}

export async function uploadFileToMinio(filePath: string, objectName: string): Promise<string> {
    try {
        await minioClient.fPutObject(BUCKET_NAME, objectName, filePath, {});
        // Return direct public URL instead of presigned URL
        const publicUrl = getPublicUrl(objectName);
        
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
            // Ignore unlink error
        }
        throw error;
    }
}