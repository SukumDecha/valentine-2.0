import { Client } from "minio";
import dotenv from 'dotenv';

dotenv.config();

const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT || 'minio',
    port: parseInt(process.env.MINIO_PORT || '9000'),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

export const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || 'user-uploads';
export const PUBLIC_ENDPOINT = process.env.MINIO_PUBLIC_ENDPOINT || 'localhost';
export const PUBLIC_PORT = process.env.MINIO_PUBLIC_PORT || '9000';

export default minioClient;