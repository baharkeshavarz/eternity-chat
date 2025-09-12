'use client';

import {
  DEFAULT_MAX_WIDTH_713,
  DefaultQuestionsList,
  GREY_3D_COLOR,
} from '@/constants/general';
import { SAMPLE_CHAT_ID } from '@/constants/query-keys';
import { DEFAULT_DASHBOARD_CHAT_PATH } from '@/constants/routes';
import { useAppContext } from '@/hooks/useAppContext';
import { alpha, Box, Stack, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useGetPersonalities from '../../(main)/hooks/useGetPersonalities';
import NotificationBar from '../components/NotificationBar';
import MobileSidebar from '../components/sidebar/MobileSidebar';
import Sidebar from '../components/sidebar/Sidebar';
import TopBar from '../components/TopBar';
import ChatAIAccuracyMessage from './[userId]/components/ChatAIAccuracyMessage';
import ChatDrawer from './[userId]/components/ChatDrawer';
import ChatInput from './[userId]/components/ChatInput';
import DefaultQuestionList from './[userId]/components/DefaultQuestionList';
import { IPersonality } from '@/services/personality/types';

const ChatPage = () => {
  const t = useTranslations();
  const router = useRouter();

  const locale = useLocale();
  const { isMobile } = useAppContext();
  const [collapsed, setCollapsed] = useState(true);
  const toggleDrawer = () => setCollapsed(!collapsed);
  const [seletedDefaultQuestion, setSelectedDefaultQuestion] = useState(0);

  const onHandleSelectQuestion = (id: number) => {
    setSelectedDefaultQuestion(id);
  };

  const { data } = useGetPersonalities();

  // Extract personalities from API response
  const personalities = data?.personalities?.[0]?.details || {};
  const user = personalities
    ? (Object.values(personalities)[0] as IPersonality)?.name
    : '';

  const handleStartChat = () => {
    router.push(DEFAULT_DASHBOARD_CHAT_PATH + `/${user}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      {isMobile ? (
        <MobileSidebar toggleDrawer={toggleDrawer} collapsed={collapsed} />
      ) : (
        <Sidebar collapsed={collapsed} />
      )}

      <Stack minHeight={0} flex={1} bgcolor="#F7F7F7">
        <TopBar collapsed={collapsed} toggleCollapsed={toggleDrawer} />
        <Box display="flex" flex={1} minHeight={0} position="relative">
          <ChatDrawer />
          <Box width="100%" flex={1} display="flex" flexDirection="column">
            <NotificationBar />
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="space-around"
              width="100%"
              mx="auto"
              sx={{
                height: '100%',
                minHeight: 0,
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  maxWidth={DEFAULT_MAX_WIDTH_713}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Typography
                    variant="h1"
                    fontWeight="700"
                    textAlign="center"
                    color={GREY_3D_COLOR}
                  >
                    {t('pages.chat.welcome.welcomeMsg')}
                  </Typography>

                  <Typography
                    fontSize={18}
                    my={2}
                    px={4}
                    textAlign="center"
                    className={`latoStyleRegular-${locale}`}
                    color={alpha(GREY_3D_COLOR, 0.7)}
                  >
                    {t('pages.chat.welcome.description')}
                    {seletedDefaultQuestion}
                  </Typography>
                  <ChatInput
                    defaultQuestion={
                      seletedDefaultQuestion
                        ? (DefaultQuestionsList.find(
                            (x) => x.id === seletedDefaultQuestion,
                          )?.value as string)
                        : ''
                    }
                    handleStartChat={handleStartChat}
                  />
                </Box>
                <DefaultQuestionList
                  onHandleSelectQuestion={onHandleSelectQuestion}
                />
              </Box>
              <ChatAIAccuracyMessage />
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ChatPage;
