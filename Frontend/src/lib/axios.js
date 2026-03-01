import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true, // For cookie support
})

export default axiosInstance