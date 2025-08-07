import { getChatHistory } from '@/services/chat';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import ChatItems from './ChatItems';
import MessageBubbleSkeleton from './MessageBubbleSkeleton';
import {
  GET_CHAT_HISTORY_QUERY_KEY,
  SAMPLE_CHAT_USER_ID,
  SAMPLE_CHAT_USER_PERSONALITY,
} from '@/constants/query-keys';
import useAxiosAuth from '@/hooks/useAxiosAuth';

const MessagesContainer = () => {
  const axiosAuth = useAxiosAuth();
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const { data, isFetching } = useQuery({
    enabled: !!SAMPLE_CHAT_USER_ID,
    queryKey: [GET_CHAT_HISTORY_QUERY_KEY, SAMPLE_CHAT_USER_ID],
    queryFn: async () => {
      const { data } = await getChatHistory({
        params: {
          personality_name: SAMPLE_CHAT_USER_PERSONALITY,
        },
      });
      return data;
    },
    gcTime: 0,
    notifyOnChangeProps: 'all',
    placeholderData: [],
  });

  useEffect(() => {
    if (data?.length) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data?.length]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        minHeight: 0,
      }}
    >
      {isFetching ? (
        <Box pt={2}>
          {new Array(4).fill(1).map((_i, index) => (
            <MessageBubbleSkeleton
              key={index.toString()}
              isLeft={index % 2 === 0}
            />
          ))}
        </Box>
      ) : (
        <>
          <ChatItems items={data || []} />
          <div ref={chatEndRef} />
        </>
      )}
    </Box>
  );
};

export default MessagesContainer;
