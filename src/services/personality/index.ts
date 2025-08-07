import { axiosInstance } from '@/lib/axios';
import {
  CreatePersonalityService,
  ListPersonalitiesService,
  UpdatePersonalityService,
} from './types';

const BASE_URL = '/api/v1';

export const createPersonality: CreatePersonalityService = ({ params }) => {
  return axiosInstance.get(`${BASE_URL}/CreatePersonality`, { params });
};

export const getListPersonalities: ListPersonalitiesService = ({ params }) => {
  return axiosInstance.get(`${BASE_URL}/list-personalities`, { params });
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
