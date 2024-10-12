import axios from "axios"

export const makeRequest = axios.create({
    baseURL: "http://192.168.43.160:8800/api/",
    withCredentials: true,
})