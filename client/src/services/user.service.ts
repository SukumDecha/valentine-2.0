import api from "./api";
import { UserDataResponse, ImageWithTextResponse } from "@/types/service/main";


export const getUserData = async (uuid: string): Promise<UserDataResponse> => {
    try {
        const response = await api.get<UserDataResponse>(`/users/${uuid}`);
        if (response.status === 200 && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'User data fetched successfully',
                trackId: response.data.trackId,
                trackImage: response.data.trackImage,
                images: response.data.images as ImageWithTextResponse[],
                template: response.data.template
            };
        }
        return {
            success: false,
            message: 'Failed to fetch images',
        };

    } catch (error: any) {
        console.error('Fetch User Data Error:', error);
        if (error.response) {
            const errorMessage = error.response.data?.message ||
                `Fetch user data failed with status ${error.response.status}`;
            throw new Error(errorMessage);
        }
        if (error.request) throw new Error('Check connection.')
        throw new Error(error.message || 'An unexpected error occurred during fetch user data');
    }
}