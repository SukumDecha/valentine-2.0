import { Express } from 'express-serve-static-core';

declare global {
  namespace Express {
    interface Request {
      processedFiles?: Array<{
        filename: string;
        path: string;
        buffer: Buffer;
        originalname: string;
        mimetype: string;
        size: number;
      }>;
    }
  }
}