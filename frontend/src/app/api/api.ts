import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { signOut } from 'next-auth/react';

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: DEFAULT_HEADERS,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          signOut;
          break;
        case 403:
          toast({
            title: `Sorry, you don't have permission to access this page.`,
            variant: 'destructive',
          });

          break;
        case 404:
          toast({
            title: 'Route not found',
            variant: 'destructive',
          });
          break;
        default:
          return Promise.reject(response.data);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
