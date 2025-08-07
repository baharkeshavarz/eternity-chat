import { axiosAuth } from '../../lib/axios';
import { GeneralInformationUpdateService } from './types';

const BASE_URL = '/api/v1/onboarding';

export const generalInformationUpdate: GeneralInformationUpdateService = ({
  payload,
}) => {
  return axiosAuth.post(`${BASE_URL}/register`, payload);
};
