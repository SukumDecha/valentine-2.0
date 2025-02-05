import api from "./api";


interface TrackResponse {
    success: boolean;
    message?: string;
    trackId?: string;
}

export const getTrackId = async (): Promise<TrackResponse> => {
    try {
        const response = await api.get<{ id: string }>('/songs/track');

        if (response.status === 200) {
            return {
                success: true,
                message: 'Track fetched successfully',
                trackId: response.data.id as string
            }
        }
        return {
            success: false,
            message: 'Failed to get track'
        }
    } catch (error:any) {
        console.error('Upload Error:', error);
        throw new Error(error.message || 'Can not get track');
    }
}