import { Box } from '@mui/material';
import { useAuth } from 'react-oidc-context';

const SignInComponent = () => {
  const auth = useAuth();

  if (auth?.isLoading) return <p>Loading...</p>;
  if (auth?.error) return <p>Error: {auth?.error?.message}</p>;

  if (!auth?.isAuthenticated) {
    return <button onClick={() => auth?.signinRedirect()}>Login</button>;
  }

  const user = auth.user;
  console.log('user', user);
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
      <div>
        <h2>
          Welcome, {user?.profile?.name || user?.profile?.preferred_username}
        </h2>
        <p>Email: {user?.profile?.email}</p>
        <p>access_token: {user?.access_token}</p>
      </div>
    </Box>
  );
};

export default SignInComponent;
