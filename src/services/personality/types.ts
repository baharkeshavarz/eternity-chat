import { GenderEnum, ToneEnum } from '../common/types';
import { Basic, Response } from '../types/common';

export interface IPersonality {
  name: string;
  gender: GenderEnum;
  age: number;
  occupation: string;
  personality: string;
  tone: ToneEnum;
}

export interface ICreatePersonality extends IPersonality {
  user_id: string;
}
export interface Personality {
  name: string;
  details: IPersonality;
}

export interface GetPersonalitiesResponse {
  user_id: string;
  total_personalities: number;
  personalities: Personality[];
}

export interface IUpdatePersonalityParams {
  user_id: string;
  personality_name: string;
}

export interface CreatePersonalityService {
  (args: { axiosAuth: any; params: ICreatePersonality }): Response<Basic>;
}

export interface ListPersonalitiesService {
  (args: {
    params: { user_id?: string | null };
  }): Response<GetPersonalitiesResponse>;
}

export interface UpdatePersonalityService {
  (args: {
    params: IUpdatePersonalityParams;
    payload: IPersonality;
  }): Response<Basic>;
}
