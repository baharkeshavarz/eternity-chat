'use client';

import { appContext } from '@/contexts/appContext';
import useTokenSetter from '@/hooks/useTokenSetter';
import { useMediaQuery, useTheme } from '@mui/material';
import { userAgent } from 'next/server';
import { FC, PropsWithChildren } from 'react';

export interface AppProviderProps {
  userAgent: ReturnType<typeof userAgent>;
}

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = ({
  children,
  userAgent,
}) => {
  const theme = useTheme();
  const inMobileView = useMediaQuery(theme.breakpoints.down('md'));

  const isMobile = userAgent?.device?.type === 'mobile' || inMobileView;

  useTokenSetter();

  return (
    <appContext.Provider
      value={{
        isMobile: !!isMobile,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
