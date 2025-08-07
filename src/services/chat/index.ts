import { SAMPLE_VOICE_ID } from '@/constants/query-keys';
import externalApi from '../../lib/externalApi';

import {
  GetChatHistoryService,
  ChatService,
  ChatTextToVoiceService,
} from './types';
import { axiosAuth } from '@/lib/axios';

const BASE_URL = '/api/v1';
const SPEECCH_URL = '/v1';
const voiceId = SAMPLE_VOICE_ID;
const apiKey = 'sk_af19c153ad88b4eed6776e26cfd95428d718fd25a12b09c9';

export const chat: ChatService = (axiosAuth, { payload }) => {
  return axiosAuth.post(`${BASE_URL}/chat`, payload);
};

export const getChatHistory = (
  //axiosAuth: any,
  { params }: { params: Record<string, any> },
) => {
  return axiosAuth.get(`${BASE_URL}/chat-history`, { params });
};

export const textToSpeech: ChatTextToVoiceService = ({ payload }) => {
  return externalApi.post(`${SPEECCH_URL}/text-to-speech/${voiceId}`, payload, {
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
      Accept: 'application/json',
    },
    responseType: 'arraybuffer',
  });
};
