'use client';

import { FC, PropsWithChildren } from 'react';
import { AuthProvider, AuthProviderProps } from 'react-oidc-context';

const cognitoAuthConfig: AuthProviderProps = {
  authority: process.env.NEXT_PUBLIC_COGNITO_AUTH_CONFIG_AUTHORITY || '',
  client_id: process.env.NEXT_PUBLIC_COGNITO_AUTH_CONFIG_CLIENT_ID || '',
  redirect_uri: process.env.NEXT_PUBLIC_COGNITO_AUTH_CONFIG_REDIRECT_URI || '',
  response_type: 'code',
  scope: 'email openid phone',
};

const OidcAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
};

export default OidcAuthProvider;
