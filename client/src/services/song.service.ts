import api from "./api";
import { Track } from '@/shared/types';

interface SearchTrackResponse {
    success: boolean;
    message?: string;
    tracks?: Track[];
}


export const searchTrack = async (query: string): Promise<SearchTrackResponse> => {
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
                tracks: response.data as Track[]
            }
        }
        return {
            success: false,
            message: 'Failed to get tracks'
        }
    } catch (error:any) {
        console.error('Upload Error:', error);
        throw new Error(error.message || 'Can not get track');
    }
}