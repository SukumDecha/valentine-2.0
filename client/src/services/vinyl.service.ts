import { IUserResponse, IVinyl, IVinylResponse, VinylForm } from "@/types/vinyl/vinyl";
import api from "./api";

const VinylService = {

    getUser: async (uuid: string): Promise<IUserResponse> => {
        try {
            const response = await api.get<IUserResponse>(`/users/${uuid}`);
            if (response.status === 200 && response.data.success) {
                return {
                    success: true,
                    message: response.data.message || 'User data fetched successfully',
                    trackId: response.data.trackId,
                    trackImage: response.data.trackImage,
                    images: response.data.images as IVinyl[],
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
    },
    updateUser: async (data: VinylForm): Promise<boolean> => {
        try {
            await VinylService.addTemplate(data.id, data.templateId);
            await VinylService.addTrackId(data.id, data.track?.trackId as string, data.track?.trackImage as string);
            return true;
        } catch (error: any) {
            console.error('Update User Error:', error);
            throw new Error(error.message || 'Can not update user data');
        }
    },
    addTemplate: async (uuid: string, template: string): Promise<boolean> => {
        try {
            const response = await api.post(`/template/${uuid}`, { template });
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error: any) {
            console.error('Upload Error:', error);
            throw new Error(error.message || 'Can not add template');
        }
    },
    addTrackId: async (uuid: string, trackId: string, trackImage: string): Promise<boolean> => {
        try {
            const response = await api.post(`/songs/${uuid}`, { trackId, trackImage });
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error: any) {
            console.error('Upload Error:', error);
            throw new Error(error.message || 'Can not add track');
        }
    },
    uploadVinyls: async (uuid: string, images: IVinyl[]): Promise<IVinylResponse> => {
        if (!images || images.length === 0) {
            throw new Error('No files provided for upload');
        }

        const formData = new FormData();
        images.forEach((image) => {
            formData.append(`images`, image.file);
            formData.append(`texts`, image.text);
        });

        try {
            const response = await api.post<IVinylResponse>(`/uploads/${uuid}`, formData, {
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

}

export default VinylService;