import axios from "axios";

const API = axios.create({
    baseURL:"http://192.168.125.129:3001/api", //URL del backend
    withCredentials: true,
})
API.interceptors.request.use((req) => {
    const token=localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req;
})
export default API;