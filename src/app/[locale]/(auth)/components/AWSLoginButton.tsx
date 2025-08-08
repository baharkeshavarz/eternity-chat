import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import { AWS_ICON } from '@/constants/general';
import { Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useAuth } from 'react-oidc-context';
import LoadingComponent from '@/components/common/LoadingComponent';

const AWSLoginButton = () => {
  const t = useTranslations();
  const auth = useAuth();
  if (auth?.isLoading) return <LoadingComponent />;

  return (
    <ButtonWithLoading
      fullWidth
      component={'a'}
      variant="outlined"
      color="inherit"
      sx={{ height: 50 }}
      startIcon={<Image alt="" width={25} height={25} src={AWS_ICON} />}
      onClick={() => auth?.signinRedirect()}
    >
      <Typography
        variant="body1"
        component="span"
        sx={{
          textAlign: 'center',
        }}
      >
        {t('common.buttons.awsBtn')}
      </Typography>
    </ButtonWithLoading>
  );
};

export default AWSLoginButton;
