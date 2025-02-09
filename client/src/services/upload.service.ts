import { error } from "console";
import api from "./api";

interface UploadImagesResponse {
    success: boolean;
    message?: string;
    files?: string[];
}

export const uploadFiles = async (slug :string, files: File[]): Promise<UploadImagesResponse> => {
    // Validate input
    if (!files || files.length === 0) {
        throw new Error('No files provided for upload');
    }

    const formData = new FormData();
    files.forEach((file) => {
        formData.append(`images`, file);
    });

    try {
        const response = await api.post<UploadImagesResponse>(`/uploads/${slug}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            timeout: 30000,
            // progress for ensuring upload progress 100% or not
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
                message: response.data.message || 'Files uploaded successfully',
                files: response.data.files
            };
        }

        return {
            success: false,
            message: 'Failed to upload files'
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