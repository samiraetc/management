import axios from 'axios';

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: DEFAULT_HEADERS,
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
