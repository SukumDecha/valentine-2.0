import { Request, Response } from "express";
import { getDB } from "../database/database";
import { generateUUID } from "../utils/uuid";

export const mockupData = async (req: Request, res: Response) : Promise<void> => {
    try {
        const db = getDB().collection('users');
        for (let i = 0; i < 100; i++) {
            await db.insertOne({ uuid: generateUUID() });
        }
        res.status(201).json({ message: "Create mock-up users successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }

}
