import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useAuth } from 'react-oidc-context';

const SignInComponent = () => {
  const auth = useAuth();

  if (auth?.isLoading) return <p>Loading...</p>;
  if (auth?.error) return <p>Error: {auth?.error?.message}</p>;

  if (!auth?.isAuthenticated) {
    return <button onClick={() => auth?.signinRedirect()}>Login</button>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      overflow="hidden"
    >
      <button onClick={() => auth?.signoutRedirect()}>Logout</button>
    </Box>
  );
};

export default SignInComponent;
