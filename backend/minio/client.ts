import { Client } from "minio";
import dotenv from 'dotenv';

dotenv.config();

const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: parseInt(process.env.MINIO_PORT || '9000'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY || 'melbromss',
    secretKey: process.env.MINIO_SECRET_KEY || '123456789',
});

export const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || 'user-uploads';

export default minioClient;