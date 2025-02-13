import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
});

console.log("Hello ", "GHELLO")

const api = {
    get: <T>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> =>
        axiosInstance.get<T>(url, config),

    post: <T>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> =>
        axiosInstance.post<T>(url, data, config),

    put: <T>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> =>
        axiosInstance.put<T>(url, data, config),

    delete: <T>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> =>
        axiosInstance.delete<T>(url, config),
};

export default api;
