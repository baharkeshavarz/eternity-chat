import { axiosInstance } from '../../lib/axios';
import {
  GetAccountDetail,
  GetProfileService,
  LoginByRefreshTokenService,
  LogoutService,
} from './types';

const BASE_URL = '/api/v1/account';

export const loginByRefreshToken: LoginByRefreshTokenService = ({
  payload,
}) => {
  return axiosInstance.post(`${BASE_URL}/loginByRefreshToken`, payload);
};

export const logout: LogoutService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}/logout`, payload);
};

export const getProfile: GetProfileService = () => {
  return axiosInstance.get(`${BASE_URL}/getProfile`);
};

export const getAccountDetail: GetAccountDetail = () => {
  return axiosInstance.get(`${BASE_URL}/detail`);
};
