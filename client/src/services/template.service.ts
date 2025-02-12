import api from "./api";

export const addTemplate = async (uuid: string, template: string): Promise<boolean> => {
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
}