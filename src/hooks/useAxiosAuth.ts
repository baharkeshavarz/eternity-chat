'use client';

import { axiosAuth } from '@/lib/axios';
import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

const useAxiosAuth = () => {
  const auth = useAuth();
  const user = auth?.user;

  useEffect(() => {
    axiosAuth.defaults.headers.common['Authorization'] = user?.access_token;
    // const requestInterceptor = axiosAuth.interceptors.request.use(
    //   (config) => {
    //     if (user?.access_token) {
    //       config.headers['Authorization'] = `Bearer ${user.access_token}`;
    //     }
    //     return config;
    //   },
    //   (error) => {
    //     return Promise.reject(error);
    //   },
    // );
    // return () => {
    //   axiosAuth.interceptors.request.eject(requestInterceptor);
    // };
  }, [user?.access_token]);

  return axiosAuth;
};

export default useAxiosAuth;
