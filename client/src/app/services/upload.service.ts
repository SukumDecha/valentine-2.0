import axiosInstance from "./axios";

export const uploadFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('images', file);
    });

    try {
        const response = await axiosInstance.post('/uploads', formData);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}