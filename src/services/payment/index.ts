import { axiosAuth } from '../../lib/axios';
import { PermiumPlanRegisterService } from './types';

const BASE_URL = '/api/v1';

export const permiumPlanRegister: PermiumPlanRegisterService = ({
  payload,
}) => {
  return axiosAuth.post(`${BASE_URL}/permiumPlanRegister`, payload);
};
