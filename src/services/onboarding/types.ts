import { Response } from '../types/common';

export interface GeneralInformationPayload {
  name: string;
  relationship: string;
  gender: string;
}

export interface PersonalityTraitsPayload {
  favoriteActivities: string;
  personality?: string[];
}

export interface AppearancePayload {
  description: string;
  photo?: string;
}

export interface CommunicationPayload {
  description: string;
  saying: string;
  lovedVoice?: string | null;
  textVoice?: string | null;
}

export interface MemoriesPayload {
  description: string | null;
  receiveReminderDate: string | null;
}

export interface GeneralInformationUpdateService {
  ({ payload }: { payload: GeneralInformationPayload }): Response;
}
