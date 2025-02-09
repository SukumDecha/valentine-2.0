import { Track } from "@/shared/types";
import api from "./api";

interface UploadImagesResponse {
    success: boolean;
    message?: string;
    files?: string[];
}

interface SearchTrackResponse {
    success: boolean;
    message?: string;
    tracks?: Track[];
}

interface UserDataResponse {
    success: boolean;
    message?: string;
    trackId?:string;
    images?: string[];
}


export const uploadFiles = async (uuid :string, files: File[]): Promise<UploadImagesResponse> => {
    if (!files || files.length === 0) {
        throw new Error('No files provided for upload');
    }

    const formData = new FormData();
    files.forEach((file) => {
        formData.append(`images`, file);
    });

    try {
        const response = await api.post<UploadImagesResponse>(`/uploads/${uuid}`, formData, {
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

export const addTrackId = async (uuid: string, trackId: string): Promise<boolean> => {
    try {
        const response = await api.post(`/songs/${uuid}`, { trackId });
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (error: any) {
        console.error('Upload Error:', error);
        throw new Error(error.message || 'Can not add track');
    }
}


export const getUserData = async (uuid: string) : Promise<UserDataResponse> => {
    try {
        const response = await api.get<UserDataResponse>(`/users/${uuid}`);
        if (response.status === 200 && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'User data fetched successfully',
                trackId: response.data.trackId,
                images: response.data.images
            };
        }
        return {
            success: false,
            message: 'Failed to fetch images'
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