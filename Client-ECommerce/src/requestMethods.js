import axios from 'axios';

console.log('2 BASE_URL:', process.env.REACT_APP_BASE_URL);
console.log('1 BASE_URL:', import.meta.env.REACT_APP_BASE_URL);
const BASE_URL = import.meta.env.VITE_BASE_URL + "/api";
// const BASE_URL = "https://figures-shop.up.railway.app/api";
// const BASE_URL = "http://localhost:5000/api";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user)?.currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
    baseURL : BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
})