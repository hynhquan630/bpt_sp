import axios from "axios"

export const makeRequest = axios.create({
    baseURL: "https://bpt-sp.onrender.com/api/",
    withCredentials: true,
})