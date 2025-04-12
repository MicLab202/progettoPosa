import axios from "axios";
const API = axios.create({
    baseURL: "/api", // Ora passerà attraverso il proxy Nginx
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