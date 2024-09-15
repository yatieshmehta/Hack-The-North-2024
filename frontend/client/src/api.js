import axios from 'axios';

// Function to safely access environment variables with a fallback
const getEnvVariable = (key, fallback) => {
  if (import.meta && import.meta.env && import.meta.env[key] !== undefined) {
    return import.meta.env[key];
  }
  console.warn(`Environment variable ${key} is not defined. Using fallback value.`);
  return fallback;
};

// Base URL for your API
const API_BASE_URL = getEnvVariable('VITE_API_URL', 'http://10.37.99.217:8000');

// Axios instance with common configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// API call functions
export const signUp = (userData) => api.post('/sign-up/', userData);
export const signIn = (credentials) => api.post('/sign-in/', credentials);
export const deleteUser = () => api.delete('/delete-user/');
export const addPost = (postData) => api.post('/add-post/', postData);
export const deletePost = (postId) => api.delete('/delete-post/', { data: { post_id: postId } });
export const getPosts = () => api.get('/get-posts/');
export const getPost = (postId) => api.get('/get-post/', { params: { post_id: postId } });
export const applyToPost = (postId) => api.post('/apply-to-post/', { post_id: postId });
export const getUserPosts = () => api.get('/get-user-posts/');
export const viewApplicants = (postId) => api.get('/view-applicants/', { params: { post_id: postId } });
export const getUserData = () => api.get('/get-user-data/');

export default api;