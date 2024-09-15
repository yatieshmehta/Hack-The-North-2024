import axios from 'axios';

const axiosWithAuth = axios.create();

axiosWithAuth.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/api/token/refresh/', { refresh: refreshToken });
        if (response.data.access) {
          localStorage.setItem('accessToken', response.data.access);
          axiosWithAuth.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
          return axiosWithAuth(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export { axiosWithAuth };