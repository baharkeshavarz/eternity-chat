import { ToneEnum } from '../common/types';
import { Response } from '../types/common';

export enum ChatUserTypeEnum {
  USER = 'user',
  SYSTEM = 'system',
}

export enum ChatMessageTypeEnum {
  HISTORY = 'history',
  CURRENT = 'current',
}

export enum ChatCardDirectionEnum {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface ISentiment {
  label: string;
  score: number;
  tone: ToneEnum;
}

export interface ChatPayload {
  user_id: string;
  personality_name: string;
  message: string;
}

export interface IChatHistoryParams {
  user_id: string;
  personality_name: string;
}

export interface IChatHistoryItem {
  message: string;
  response: string | null;
  personality_name: string;
  timestamp: string;
  has_context: boolean;
  traceId?: string;
  isLoading?: boolean;
  isError?: boolean;
  type?: ChatMessageTypeEnum;
}

export interface ChatResponse {
  response: string;
  sentiment: ISentiment[];
}

export interface IFeedback {
  reasons: string[];
  message?: string;
}

export interface AvatarSetting {
  model_id?: string;
  voice_settings?: {
    stability?: number;
    similarity_boost?: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
  generation_config?: {
    emotion?: ToneEnum;
    emotion_level?: number;
  };
}

export interface IChatTextToVoicePayload {
  //extends AvatarSetting
  text: string;
  // voice: string;
}

export interface ChatService {
  ({ payload }: { payload: ChatPayload }): Response<ChatResponse>;
}

export interface GetChatHistoryService {
  (args: { params: IChatHistoryParams; userId: number | string }): Response<
    IChatHistoryItem[]
  >;
}

export interface ChatTextToVoiceService {
  ({ payload }: { payload: IChatTextToVoicePayload }): Response;
}

export interface IStartRankingFeedback {
  star: number;
  message?: string;
}
