import { Client } from "minio";
import dotenv from 'dotenv';

dotenv.config();

const minioClient = new Client({
    endPoint: process.env.MINIO_INTERNAL_ENDPOINT || 'minio',
    port: parseInt(process.env.MINIO_PORT || '9000'),
    // useSSL: false, true on production
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    region: 'us-east-1',
});

export const PUBLIC_ENDPOINT = process.env.MINIO_PUBLIC_ENDPOINT || 'localhost';
export const INTERNAL_ENDPOINT = process.env.MINIO_INTERNAL_ENDPOINT || 'minio';
export const PUBLIC_PORT = process.env.MINIO_PORT || '9000';
export const BUCKET_NAME = process.env.MINIO_BUCKET_NAME_1 || 'user-uploads';


export default minioClient;