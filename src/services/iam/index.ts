import { axiosInstance } from '../../lib/axios';
import { SignInService, SignUpService } from './types';

const BASE_URL = '/v1/iam';

export const signIn: SignInService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}/signin`, payload);
};

export const signup: SignUpService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}/signup`, payload);
};
