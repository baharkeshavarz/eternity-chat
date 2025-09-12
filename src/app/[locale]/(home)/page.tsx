'use client';

import ChatExperience from './components/ChatExperience';
import ChooseUs from './components/ChooseUs';
import { Container } from '@mui/material';
import { Header } from '@/components/Header';
import { Navbar } from '@/components/Navbar';
import { DEFAULT_ONBOARDING_PATH } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace(DEFAULT_ONBOARDING_PATH);
  }, [router]);
  // const containerMaxWidth = useResponsiveContainer();
  return (
    <>
      {/* <Navbar />
      <Header />
      <Container maxWidth={containerMaxWidth}>
        <ChatExperience />
        <ChooseUs />
      </Container> */}
    </>
  );
}
