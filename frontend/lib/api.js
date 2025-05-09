// utils/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://task-torch-1.onrender.com/api',
    withCredentials: true, // ✅ This sends cookies automatically
    headers: {
        'Content-Type': 'application/json'
    }
});


// Optional: Automatically include token in every request if available
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
