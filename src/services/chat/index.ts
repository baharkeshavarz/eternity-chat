import { SAMPLE_VOICE_ID } from '@/constants/query-keys';
import externalApi from '../../lib/externalApi';

import { axiosInstance } from '@/lib/axios';
import {
  ChatService,
  ChatTextToVoiceService,
  GetChatHistoryService,
} from './types';

const BASE_URL = '/api/v1';
const SPEECH_URL = '/v1';
const voiceId = SAMPLE_VOICE_ID;
const apiKey = 'sk_af19c153ad88b4eed6776e26cfd95428d718fd25a12b09c9';

export const chat: ChatService = ({ payload }) => {
  return axiosInstance.post(`${BASE_URL}/chat`, payload);
};

export const getChatHistory: GetChatHistoryService = ({ params }) => {
  return axiosInstance.get(`${BASE_URL}/chat-history`, { params });
};

export const textToSpeech: ChatTextToVoiceService = ({ payload }) => {
  return externalApi.post(`${SPEECH_URL}/text-to-speech/${voiceId}`, payload, {
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
      Accept: 'application/json',
    },
    responseType: 'arraybuffer',
  });
};
