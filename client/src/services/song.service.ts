import { ITrack, ITrackResponse } from "@/types/track";
import api from "./api";

export const searchTrack = async (query: string): Promise<ITrackResponse> => {
    try {
        const response = await api.get(`/songs/search`, {
            params: {
                q: query
            }
        });
        if (response.status === 200) {
            console.log(response.data)
            return {
                success: true,
                message: 'Tracks fetched successfully',
                tracks: response.data as ITrack[]
            }
        }
        return {
            success: false,
            message: 'Failed to get tracks'
        }
    } catch (error: any) {
        console.error('Upload Error:', error);
        throw new Error(error.message || 'Can not get track');
    }
}

