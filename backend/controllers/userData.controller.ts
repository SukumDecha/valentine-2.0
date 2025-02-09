import { Request, Response } from "express";
import { getDB } from "../database/database";
import { transformMinioUrl } from "../minio/utils";

export const getUserData = async (req: Request, res: Response): Promise<void> => {
    try {
        const userUuid = req.params.uuid;
        const db = getDB().collection('users');
        const user = await db.findOne({ uuid: userUuid });

        if (!user) {
            res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
            return;
        }

        // Transform MinIO URLs to use localhost
        const transformedImages = user.images?.map((url: string) => transformMinioUrl(url)) || [];

        res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            images: transformedImages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching user data",
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}