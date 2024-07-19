import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstace = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "content-type": "application/json",
        },
        withCredentials: true,
        ...config,
    });

    axiosInstace.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosInstace;
};

export const httpClient = createClient();
