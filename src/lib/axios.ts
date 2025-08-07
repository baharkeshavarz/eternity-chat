import axios from 'axios';
import { toast } from 'react-toastify';

export const config = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'api',
  timeout: 3000 * 10,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_API_URL,
  },
};

export const _axios = axios.create(config);
export const axiosAuth = axios.create(config);

_axios.interceptors.request.use(
  (config) => {
    const lang = 'en-EN'; //TODO: get from i18n or context
    if (lang) {
      config.headers['Accept-Language'] = lang;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

_axios.interceptors.response.use(
  (next) => {
    const message = next.data?.message;
    if (message) {
      toast.success(message);
    }
    return Promise.resolve(next);
  },
  async (error) => {
    const status = error?.response?.status;
    // const expectedErrors = status >= 400 && status <= 500;

    if (status === 401) {
      // try {
      // if (!auth.refreshToken) {
      //   throw Error('Refresh token is not exist!');
      // }
      // if (!refreshingFunc) {
      //   refreshingFunc = loginByRefreshToken({
      //     payload: { refreshToken: auth.refreshToken },
      //   });
      // }
      //   const response = await refreshingFunc;
      //   if (!response.data.succeed) {
      //     throw Error('Refresh token is not valid!');
      //   }
      //   try {
      //     auth.login(response.data.value);
      //     return await axios.request(error.config);
      //   } catch (innerError) {
      //     if (isUnauthorizedError(innerError)) {
      //       throw innerError;
      //     }
      //   }
      // } catch (err) {
      //   await auth.logout();
      // } finally {
      //   refreshingFunc = undefined;
      // }
      // } else if (expectedErrors) {
      //   const message = error.response.data?.message;
      //   !!message && toast.error(message);
      // }
      //  return Promise.reject(error);
    }
  },
);
