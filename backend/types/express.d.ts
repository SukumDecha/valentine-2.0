import { Request } from "express";

export interface ProcessedFile {
    filename: string;
    path: string;
}

export interface CustomRequest extends Request {
    processedFiles?: ProcessedFile[];
}
