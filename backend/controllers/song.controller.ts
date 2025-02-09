import { Request, Response } from "express";
import { getSpotifyToken } from "../utils/spotify";
import axios from "axios";
import { getTrackList } from "../utils/spotify";
import { getDB } from "../database/database";

export const check = async (req: Request, res: Response): Promise<void> => {
    const token = await getSpotifyToken();
    if (!token) {
        res.status(500).json({ error: "Failed to get Spotify token" });
        return;
    }
    res.status(200).json({ token: token, message: "Spotify token is valid" });
}

export const searchTrack = async (req: Request, res: Response): Promise<void> => {
    const { q } = req.query;
    const token = await getSpotifyToken();

    if (!token) {
        res.status(500).json({ error: "Failed to get Spotify token" });
        return;
    }

    try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                q: q,
                type: "track",
                limit: 4,
            },
        });
        const data = getTrackList(response.data.tracks.items);
        res.json(data);

    } catch (error: any) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data || "Error fetching track",
        });
    }

}

export const addTrackId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { trackId, trackImage } = req.body;
        const db = getDB().collection('users');
        const addTrack = await db.updateOne(
            { uuid: req.params.uuid },
            { $set: { trackId: trackId, trackImage: trackImage } } 
        );

        if (addTrack.modifiedCount === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "Track added successfully" });
    } catch (error) {

    }
}
