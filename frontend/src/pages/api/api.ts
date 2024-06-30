import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 404 || error.response.status === 401) {
      console.log(
        `Error: ${error.response.status} - ${error.response.statusText}`,
      );
    }
    return Promise.reject(error);
  },
);

export default api;
