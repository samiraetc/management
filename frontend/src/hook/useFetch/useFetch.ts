import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import api from '@/pages/api/api';

interface UseFetchProps {
  url: string;
  params?: object;
}

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetch = <T = any>({
  url,
  params = {},
}: UseFetchProps): UseFetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const CancelToken = axios.CancelToken.source();

  useEffect(() => {
    setLoading(true);

    api
      .get(`${url}`, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        params: params,
        cancelToken: CancelToken.token,
      })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
