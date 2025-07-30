'use client';

import React, { FC, PropsWithChildren } from 'react';
import { AuthProvider } from 'react-oidc-context';

const cognitoAuthConfig = {
  authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_zOV8Axzbc',
  client_id: '6p1991d5q5qlvmpvdbiir5ucfn',
  redirect_uri: 'https://d841lyp8p4kdic.cloudfront.net',
  response_type: 'code',
  scope: 'email openid phone',
};

const OidcAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
};

export default OidcAuthProvider;
