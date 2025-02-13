import minioClient, { BUCKET_NAME, PUBLIC_ENDPOINT, INTERNAL_ENDPOINT, PUBLIC_PORT } from "./client";
import { unlink } from 'fs/promises';

export async function initializeBucket(): Promise<void> {
    try {
        const exists = await minioClient.bucketExists(BUCKET_NAME);
        if (!exists) {
            await minioClient.makeBucket(BUCKET_NAME, "us-east-1");

            // Set bucket policy to allow public read access
            const policy = {
                Version: '2012-10-17',
                Statement: [
                    {
                        Effect: 'Allow',
                        Principal: '*',
                        Action: ['s3:GetObject'],
                        Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`]
                    }
                ]
            };

            await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
            console.log(`Bucket "${BUCKET_NAME}" created with public read policy.`);
        }
    } catch (error) {
        console.error("Error initializing bucket:", error);
        throw error;
    }
}

export function getPublicUrl(objectName: string): string {
    return `https://${PUBLIC_ENDPOINT}:${PUBLIC_PORT}/console/browser/${BUCKET_NAME}/${objectName}`;
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