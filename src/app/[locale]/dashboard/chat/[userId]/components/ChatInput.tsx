'use client';

import RoundedIcon from '@/components/common/RoundedIcon';
import VoicePlayer from '@/components/VoicePlayer';
import { DEFAULT_DASHBOARD_ICONS } from '@/constants/general';
import { GET_CHAT_HISTORY_QUERY_KEY } from '@/constants/query-keys';
import { useAppContext } from '@/hooks/useAppContext';
import { chat, textToSpeech } from '@/services/chat';
import { ChatMessageTypeEnum, IChatHistoryItem } from '@/services/chat/types';
import {
  GraphicEq as GraphicEqIcon,
  InsertEmoticon as InsertEmoticonIcon,
} from '@mui/icons-material';
import { Box, InputBase } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import useGetPersonalities from '@/app/[locale]/(main)/hooks/useGetPersonalities';
import { IPersonality } from '@/services/personality/types';

interface MessagePayload {
  message: string;
  traceId: string;
  queryKey: [string, string];
  personalityName: string;
}

type ChatInputProps = {
  defaultQuestion?: string;
  handleStartChat?: any;
};

const ChatInput: FC<ChatInputProps> = ({
  defaultQuestion = '',
  handleStartChat,
}) => {
  const t = useTranslations();
  const { isMobile } = useAppContext();

  const params = useParams<{ userId: string }>();
  const personalityId = params.userId;

  // Get personalities to use first one as fallback
  const { data: personalitiesData } = useGetPersonalities();
  const personalities = personalitiesData?.personalities?.[0]?.details || {};
  const firstPersonalityName = personalities
    ? (Object.values(personalities)[0] as IPersonality)?.name
    : '';

  useEffect(() => {
    if (defaultQuestion) setMessage(defaultQuestion);
  }, [defaultQuestion]);

  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [playbackKey, setPlaybackKey] = useState<string | null>(null);
  const [queuedMessage, setQueuedMessage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (args: { payload: any }) => chat(args),
  });
  const queryClient = useQueryClient();

  const createMessagePayload = (
    message: string,
    selectedPersonalityName: string,
  ): MessagePayload => ({
    message: message.trim(),
    traceId: Date.now().toString(),
    queryKey: [GET_CHAT_HISTORY_QUERY_KEY, selectedPersonalityName],
    personalityName: selectedPersonalityName,
  });

  const addMessageToHistory = (payload: MessagePayload) => {
    const newMessage: IChatHistoryItem = {
      traceId: payload.traceId,
      message: payload.message,
      response: null,
      personality_name: payload.personalityName,
      timestamp: new Date().toISOString(),
      has_context: false,
      isLoading: true,
    };

    queryClient.setQueryData(
      payload.queryKey,
      (prev: IChatHistoryItem[] = []) => [...prev, newMessage],
    );
  };

  const convertAllMessagesToHistory = (payload: MessagePayload) => {
    queryClient.setQueryData<IChatHistoryItem[]>(payload.queryKey, (prev) => {
      if (!prev || prev.length < 1) return prev;
      const updated = [...prev];
      for (let i = updated.length - 1; i >= 0; i -= 1) {
        if (updated[i].type === ChatMessageTypeEnum.CURRENT) {
          updated[i] = { ...updated[i], type: ChatMessageTypeEnum.HISTORY };
          break;
        }
      }
      return updated;
    });
  };

  const updateMessageInHistory = (
    payload: MessagePayload,
    updates: Partial<IChatHistoryItem>,
  ) => {
    queryClient.setQueryData(
      payload.queryKey,
      (prev: IChatHistoryItem[] = []) =>
        prev.map((item) =>
          item.traceId === payload.traceId ? { ...item, ...updates } : item,
        ),
    );
  };

  const performSend = async (text: string, personalityName: string) => {
    const payload = createMessagePayload(text, personalityName);
    try {
      setMessage('');
      // Ensure only one CURRENT item: convert any previous CURRENT to HISTORY first
      convertAllMessagesToHistory(payload);
      // Add the new outgoing message placeholder
      addMessageToHistory(payload);
      inputRef.current?.focus();
      const { data } = await mutateAsync({
        payload: {
          personality_name: personalityName,
          message: text,
        },
      });

      updateMessageInHistory(payload, {
        response: data?.response,
        isLoading: false,
        type: ChatMessageTypeEnum.CURRENT,
      });

      // Generate voice and play
      if (data?.response) {
        const { data: audioData } = await textToSpeech({
          payload: {
            text: data.response,
          },
        });

        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }

        const blob = new Blob([audioData as ArrayBuffer], {
          type: 'audio/mpeg',
        });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setPlaybackKey(Date.now().toString());
      }
    } catch {
      updateMessageInHistory(payload, {
        response: t('pages.chat.getChatResponseError'),
        isLoading: false,
        isError: true,
      });
    }
    handleStartChat?.();
  };

  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed || isPending) return;

    // Use personalityId from route, or fallback to first personality if available
    const personalityToUse = personalityId || firstPersonalityName;
    if (!personalityToUse) {
      setQueuedMessage(trimmed);
      return;
    }

    await performSend(trimmed, personalityToUse);
  };

  useEffect(() => {
    if (queuedMessage && firstPersonalityName) {
      const text = queuedMessage;
      setQueuedMessage(null);
      performSend(text, firstPersonalityName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstPersonalityName]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      mt={3}
    >
      <Box
        component="form"
        onSubmit={onSubmit}
        width="100%"
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          gap: 1,
        }}
      >
        <Box display={isMobile ? 'none' : 'block'}>
          <RoundedIcon
            width={isMobile ? 48 : 65}
            height={isMobile ? 48 : 65}
            sxProp={{ backgroundColor: 'white', flexShrink: 0 }}
            icon={
              <Image
                alt="Attachment"
                src={`${DEFAULT_DASHBOARD_ICONS}/attachment.png`}
                width={24}
                height={24}
              />
            }
          />
        </Box>

        {/* Input Field */}
        <InputBase
          inputRef={inputRef}
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            flex: 1,
            borderRadius: '40px',
            bgcolor: 'white',
            fontFamily: 'Lato, sans-serif',
            py: 1.3,
            px: 2,
            fontSize: isMobile ? 14 : 16,
            width: '100%',
          }}
          placeholder={`${t('pages.chat.typeMsg')}...`}
          multiline
          rows={1}
          endAdornment={
            <Box onClick={sendMessage} sx={{ cursor: 'pointer' }}>
              <Image
                alt="Send"
                src={`${DEFAULT_DASHBOARD_ICONS}/send.png`}
                width={isMobile ? 30 : 40}
                height={isMobile ? 30 : 40}
              />
            </Box>
          }
        />

        {/* Icons Group */}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent={isMobile ? 'center' : 'flex-start'}
          gap={1}
          mt={isMobile ? 1 : 0}
        >
          <Box display={isMobile ? 'block' : 'none'}>
            <RoundedIcon
              width={isMobile ? 48 : 65}
              height={isMobile ? 48 : 65}
              sxProp={{ backgroundColor: 'white', flexShrink: 0 }}
              icon={
                <Image
                  alt="Attachment"
                  src={`${DEFAULT_DASHBOARD_ICONS}/attachment.png`}
                  width={24}
                  height={24}
                />
              }
            />
          </Box>
          <RoundedIcon
            width={isMobile ? 48 : 65}
            height={isMobile ? 48 : 65}
            sxProp={{ backgroundColor: 'white', flexShrink: 0 }}
            icon={<InsertEmoticonIcon />}
          />
          <RoundedIcon
            width={isMobile ? 48 : 65}
            height={isMobile ? 48 : 65}
            sxProp={{ backgroundColor: 'white', flexShrink: 0 }}
            icon={<GraphicEqIcon />}
          />
        </Box>
      </Box>
      {audioUrl && (
        <VoicePlayer voiceUrl={audioUrl} playbackKey={playbackKey!} />
      )}
    </Box>
  );
};

export default ChatInput;
