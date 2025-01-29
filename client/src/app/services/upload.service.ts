import axiosInstance from "./axios";

export const uploadFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('images', file);
    });
    console.log('files', formData);
    try {
        const response = await axiosInstance.post('/uploads', formData,
            {headers: {'Content-Type': 'multipart/form-data'}
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}