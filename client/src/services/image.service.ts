import api from "./api";

interface UserImagesResponse {
    success: boolean;
    message?: string;
    images?: string[];
}

export const getUserImages = async (url_slug: string) : Promise<UserImagesResponse> => {
    try {
        const response = await api.get<UserImagesResponse>(`/images/${url_slug}`);
        if (response.status === 200 && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Images fetched successfully',
                images: response.data.images
            };
        }
        return {
            success: false,
            message: 'Failed to fetch images'
        };
    } catch (error: any) {
        console.error('Fetch Images Error:', error);
        if (error.response) {
            const errorMessage = error.response.data?.message ||
                `Fetch images failed with status ${error.response.status}`;
            throw new Error(errorMessage);
        }
        if (error.request) throw new Error('Check connection.')
        throw new Error(error.message || 'An unexpected error occurred during fetch images');
    }
}