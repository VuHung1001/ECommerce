import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + "/api";

export const publicRequest = axios.create({
    baseURL : BASE_URL,
})

export const userRequest = () => {
    const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = user && JSON.parse(user)?.currentUser;
    const TOKEN = currentUser?.accessToken;
    
    return axios.create({
        baseURL: BASE_URL,
        headers: { token: `Bearer ${TOKEN}` }
    })
}