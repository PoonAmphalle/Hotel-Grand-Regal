import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to log requests
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to log responses
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

// Room related endpoints
export const getRooms = () => api.get('/rooms');
export const getRoomById = (id) => api.get(`/rooms/${id}`);

// Dining related endpoints
export const getDining = () => api.get('/dining');
export const getDiningById = (id) => api.get(`/dining/${id}`);

export default {
  // Room exports
  getRooms,
  getRoomById,
  
  // Dining exports
  getDining,
  getDiningById,
};
