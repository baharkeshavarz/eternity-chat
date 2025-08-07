import { axiosInstance } from '../../lib/axios';
import { GeneralInformationUpdateService } from './types';

const BASE_URL = '/api/v1/onboarding';

export const generalInformationUpdate: GeneralInformationUpdateService = ({
  payload,
}) => {
  return axiosInstance.post(`${BASE_URL}/register`, payload);
};
