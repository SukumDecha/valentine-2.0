import { Client } from "minio";
import dotenv from 'dotenv';

dotenv.config();

export const PUBLIC_ENDPOINT = process.env.MINIO_PUBLIC_ENDPOINT || 'localhost';
export const PUBLIC_PORT = process.env.MINIO_PORT || '9000';
export const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || 'sit-valentine2';

const minioClient = new Client({
    endPoint: process.env.MINIO_PUBLIC_ENDPOINT || 'minio',
    port: parseInt(process.env.MINIO_PORT || '9000'),
    // useSSL: false, true on production
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    region: 'sg-central-1',
});




export default minioClient;