import { axiosInstance } from '@/lib/axios';
import {
  CreatePersonalityService,
  ListPersonalitiesService,
  UpdatePersonalityService,
} from './types';

const BASE_URL = '/api/v1';

export const createPersonality: CreatePersonalityService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}/personalities`, payload);
};

export const getListPersonalities: ListPersonalitiesService = () => {
  return axiosInstance.get(`${BASE_URL}/personalities`);
};

export const updatePersonality: UpdatePersonalityService = ({
  params,
  payload,
}) => {
  return axiosInstance.put(
    `${BASE_URL}/modify-personality/${params.user_id}/${params.personality_name}`,
    payload,
    { params },
  );
};
