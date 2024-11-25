import axios from 'axios';
import { toast } from 'sonner';



const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error('Request failed');
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      const { status, data } = response;
      console.log('Error:', response);

      switch (status) {
        case 400:
          console.error('Bad Request: Check your input.');
          toast.error(data.message || 'Bad Request: Check your input.');
          break;
        case 401:
          console.error('Unauthorized: Please log in.');
          toast.error(data.message || 'Unauthorized: Please log in.');
          break;
        case 403:
          console.error('Forbidden: You do not have access.');
          toast.error(data.message || 'Forbidden: You do not have access.');
          break;
        case 404:
          console.error('Not Found: The resource was not found.');
          toast.error(data.message || 'Not Found: The resource was not found.');
          break;
        case 500:
          console.error('Internal Server Error: Try again later.');
          toast.error(data.message || 'Internal Server Error: Try again later.');
          break;
        default:
          console.error(`Unexpected Error: ${status}`);
          toast.error(data.message || 'An unexpected error occurred.');
      }
    } else {
      console.error('Network error or server not reachable.');
      toast.error('Network error or server not reachable.');
    }

    return Promise.reject(error); // Pass error to caller for further handling if needed
  }
);


export default api;