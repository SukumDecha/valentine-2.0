import api from "./api";
import { UploadImagesWithTextsResponse, ImageWithText } from "@/types/service/main";

export const uploadImagesWithTexts = async (uuid: string, images: ImageWithText[]): Promise<UploadImagesWithTextsResponse> => {
    if (!images || images.length === 0) {
        throw new Error('No files provided for upload');
    }

    const formData = new FormData();
    images.forEach((image) => {
        formData.append(`images`, image.file);
        formData.append(`texts`, image.text);
    });

    try {
        const response = await api.post<UploadImagesWithTextsResponse>(`/uploads/${uuid}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            timeout: 30000,
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(`Upload Progress: ${percentCompleted}%`);
                }
            }
        },);

        if (response.status === 200 && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Images with texts uploaded successfully',
                images: response.data.images
            };
        }

        return {
            success: false,
            message: 'Failed to upload images and texts'
        };

    } catch (error: any) {
        console.error('Upload Error:', error);
        if (error.response) {
            const errorMessage = error.response.data?.message ||
                `Upload failed with status ${error.response.status}`;
            throw new Error(errorMessage);
        }

        if (error.request) throw new Error('Check connection.')
        throw new Error(error.message || 'An unexpected error occurred during upload');
    }
}
