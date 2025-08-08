'use client';

import { useAppContext } from '@/hooks/useAppContext';
import { Box, Container, Stack } from '@mui/material';
import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import MessagesContainer from './components/MessagesContainer';
import MobileSidebar from '../../components/sidebar/MobileSidebar';
import ChatDrawer from './components/ChatDrawer';
import ChatInput from './components/ChatInput';
import TopBar from '../../components/TopBar';
import NotificationBar from '../../components/NotificationBar';
import ChatAIAccuracyMessage from './components/ChatAIAccuracyMessage';
import { useAuth } from 'react-oidc-context';
import { DEFAULT_SIGNIN_PATH } from '@/constants/routes';
import { useRouter } from 'next/navigation';

const ChatPage = () => {
  const router = useRouter();
  const { isMobile } = useAppContext();
  const [collapsed, setCollapsed] = useState(true);
  const toggleDrawer = () => setCollapsed(!collapsed);

  const auth = useAuth();
  if (!auth?.isAuthenticated) {
    router.push(DEFAULT_SIGNIN_PATH);
  }

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
          <Box flex={1} display="flex" flexDirection="column">
            <NotificationBar />
            <Container
              maxWidth="md"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                minHeight: 0,
              }}
            >
              <MessagesContainer />
              <ChatInput />
              <ChatAIAccuracyMessage />
            </Container>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ChatPage;
