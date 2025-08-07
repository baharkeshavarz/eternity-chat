'use client';

import { setToken } from '@/lib/axios';
import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

const useTokenSetter = () => {
  const auth = useAuth();
  const token = auth?.user?.access_token;
  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, [token]);
};

export default useTokenSetter;
