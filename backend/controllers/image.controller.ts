import { Request, Response } from "express";
import { getDB } from "../database/database";
import { UserModel } from "../database/model";

export const getUserImages = async (req: Request, res: Response): Promise<void> => {
    const slug = req.params.slug;
    try {
        const db = getDB().collection('users');
        const user = await db.findOne({uuid: slug});
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Get images successfully!',
            images: user.images
        });
    } catch (error :any) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data || "Error get images",
        });
    }
}

