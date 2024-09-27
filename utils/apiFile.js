import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": 'application/json',
    }
});

api.interceptors.response.use(response => response, async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const res = await api.post("/renew-token", {
                headers: {
                    withCredentials: true
                }
            })
            api.defaults.headers.common["Authorization"] = `Bearer ${res?.data?.access_token}`;
            originalRequest.headers.common["Authorization"] = `Bearer ${res?.data?.access_token}`;

            return api(originalRequest);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    else {
        return Promise.reject(error);
    }
})