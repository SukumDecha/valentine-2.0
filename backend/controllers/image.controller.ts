import { Request, Response } from "express";
import { getDB } from "../database/database";

export const getUserImages = async (req: Request, res: Response): Promise<void> => {
    try {
        const userUuid = req.params.slug;
        const db = getDB().collection('users');
        const user = await db.findOne({ uuid: userUuid });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Images fetched successfully",
            images: user.images || []
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching images",
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

