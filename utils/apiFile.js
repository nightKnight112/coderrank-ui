import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": 'application/json',
    }
});

api.interceptors.response.use(response => response, error => {
    if (error?.response?.status === 401) {
        api.post("/renew-token", {
            headers: {
                withCredentials: true
            }
        }).then((res) => {
            api.defaults.headers.common["Authorization"] = `Bearer ${res?.data?.access_token}`
        })
    }
    else {
        return Promise.reject(error);
    }
})