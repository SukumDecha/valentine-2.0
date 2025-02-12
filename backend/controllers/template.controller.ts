import { Request, Response } from "express";
import { getDB } from "../database/database";

export const addTemplate = async (req: Request, res: Response): Promise<void> => {
    const {template} = req.body;
    try {
        const db = getDB().collection('users');
        const addTemplate = await db.updateOne(
            { uuid: req.params.uuid },
            { $set: { template: template } }
        );

        if (addTemplate.modifiedCount === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "Template added successfully" });
    } catch (error :any) {
        res.status(500).json({
            success: false,
            message: "Add template failed",
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}