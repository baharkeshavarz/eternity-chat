'use client';

import dynamic from 'next/dynamic';
const SignInComponentImport = dynamic(
  () => import('../components/SignInComponent'),
  {
    ssr: false,
  },
);

const SignIn = () => {
  return <SignInComponentImport />;
};

export default SignIn;
