import axios from 'axios';
import { User } from 'oidc-client-ts';
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

export const axiosInstance = axios.create(config);

export const getUser = () => {
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${process.env.NEXT_PUBLIC_COGNITO_AUTH_CONFIG_AUTHORITY}:${process.env.NEXT_PUBLIC_COGNITO_AUTH_CONFIG_CLIENT_ID}`,
  );

  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
};

axiosInstance.interceptors.request.use(
  (config) => {
    const lang = 'en-EN'; // TODO: get language from user settings or browser
    if (lang) {
      config.headers['Accept-Language'] = lang;
    }

    const user = getUser();

    if (user?.access_token) {
      config.headers['Authorization'] = `Bearer ${user.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
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
