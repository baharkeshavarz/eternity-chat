import { axiosAuth } from '../../lib/axios';
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
  return axiosAuth.post(`${BASE_URL}/loginByRefreshToken`, payload);
};

export const logout: LogoutService = ({ payload }) => {
  return axiosAuth.post(`${BASE_URL}/logout`, payload);
};

export const getProfile: GetProfileService = () => {
  return axiosAuth.get(`${BASE_URL}/getProfile`);
};

export const getAccountDetail: GetAccountDetail = () => {
  return axiosAuth.get(`${BASE_URL}/detail`);
};
