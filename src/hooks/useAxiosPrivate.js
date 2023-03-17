import { useEffect } from 'react';
import axios from '../apis/apis';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, autoRefresh } = useAuth();

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );
    const responseIntercept = axios.interceptors.response.use(
      async (response) => {
        return response;
      },
      async (error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 403 && error.response?.data?.message === 'El token no es valido')
          return Promise.reject(error);

        const prevRequest = error?.config;
        if (errorStatus === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh, autoRefresh]);

  return axios;
};

export default useAxiosPrivate;
