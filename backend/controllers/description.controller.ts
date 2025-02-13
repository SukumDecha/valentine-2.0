import { Request, Response } from "express";
import { getDB } from "../database/database";

export const addDescription = async (req: Request, res: Response): Promise<void> => {
    const { lover, description } = req.body;
    try {
        const db = getDB().collection('users');
        const addDescription = await db.updateOne(
            { uuid: req.params.uuid },
            {
                $set: {
                    description: {
                        lover,
                        description
                    }
                }
            }
        );

        if (addDescription.modifiedCount === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "Description added successfully" });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Add description failed",
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}