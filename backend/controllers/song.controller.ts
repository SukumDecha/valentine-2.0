import { Request, Response } from "express";
import { getSpotifyToken } from "../utils/spotify";
import axios from "axios";
import trackList from '../track/tracks'

export const check = async (req: Request, res: Response): Promise<void> => {
    const token = await getSpotifyToken();
    if (!token) {
        res.status(500).json({ error: "Failed to get Spotify token" });
        return;
    }
    res.status(200).json({ token : token, message: "Spotify token is valid" });
}

export const getTrack = async (req: Request, res: Response): Promise<void> => {
    const trackId = trackList[Math.floor(Math.random() * trackList.length)];
    const token = await getSpotifyToken();

    if (!token) {
        res.status(500).json({ error: "Failed to get Spotify token" });
        return;
    }

    try {

        const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        res.json(response.data);

    } catch (error: any) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data || "Error fetching track",
        });
    }
};
