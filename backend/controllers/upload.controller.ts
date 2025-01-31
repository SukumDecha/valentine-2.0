import { Request, Response } from "express";
import { getDB } from "../database/database";
import { UserModel } from "../database/model";
import { generateUUID } from "../utils/uuid";


export const uploadFiles = (req: Request, res: Response): void => {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        res.status(400).send('No files uploaded.');
        return;
    }

    // console.log('uploadedFiles', req.files.map(file => ({
    //     filename: file.filename,
    //     originalname: file.originalname,
    //     mimetype: file.mimetype,
    //     size: file.size,
    //     path: file.path
    // })));

    const fileUrls = req.files.map(file => file.path);

    res.status(200).json({
        success: true,
        message: 'Images uploaded successfully!',
        files: fileUrls
    });
}

export const getUploadedFiles = async (req: Request, res: Response): Promise<void> => {
    try {
        const db = getDB().collection('users');
        const users: UserModel[] = (await db.find().toArray()).map(user => ({
            uuid: user.uuid
        }));
        res.json(users).status(200);
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
}

export const mockupData = async (req: Request, res: Response): Promise<void> => {
    try {
        const db = getDB().collection('users');
        for (let i = 0; i < 10; i++) {
            await db.insertOne({ uuid: generateUUID()});
        }
        res.json({message:"Create mock-up users successfully"}).status(201);
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
}