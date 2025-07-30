'use client';

import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import LinearFieldset from '@/components/common/LinearFieldset';
import Title from '@/components/common/Title';
import { FormBuilder } from '@/components/Fields';
import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { DEFAULT_SIGNUP_PATH } from '@/constants/routes';
import { signIn } from '@/services/iam';
import { SignInPayload } from '@/services/iam/types';
import { onInvalidSubmit } from '@/utils/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import GoogleLoginButton from '../components/GoogleLoginButton';
import RegisterTypography from '../components/RegisterTypography';
import { useAuth } from 'react-oidc-context';

const SignIn = () => {
  const t = useTranslations();
  const router = useRouter();
  const auth = useAuth();

  const labels: Record<keyof SignInPayload, string> = {
    email: t('common.fields.email'),
    // password: t('common.fields.password'),
  };

  const resolveSchema: yup.ObjectSchema<SignInPayload> = yup.object({
    email: yup.string().nullable().required().label(labels.email),
    // password: yup.string().nullable().required().label(labels.password),
  });

  const methods = useForm<SignInPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signIn,
  });

  const onSubmit: SubmitHandler<SignInPayload> = async (payload) => {
    // await mutateAsync({ payload });
    // router.push(DEFAULT_DASHBOARD_CHAT_PATH + `/${SAMPLE_CHAT_ID}`);
    router.push(DEFAULT_SIGNUP_PATH);
  };

  const fields: FormBuilderProps['fields'] = {
    email: {
      name: 'email',
      label: labels.email,
      type: 'String',
      props: {
        placeholder: t('common.fields.emailPlaceholder'),
        boldLabel: true,
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
  };

  if (auth.isLoading) return <p>Loading...</p>;
  if (auth.error) return <p>Error: {auth.error.message}</p>;

  if (!auth.isAuthenticated) {
    return <button onClick={() => auth.signinRedirect()}>Login</button>;
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
      <button onClick={() => auth.signoutRedirect()}>Logout</button>
      <FormProvider {...methods}>
        <Title
          title={t('pages.signIn.welcomeMsg')}
          subTitle={t('pages.signIn.welcomeSubMsg')}
          sx={{ my: 5, textAlign: 'center' }}
        />
        <Box
          bgcolor="common.white"
          width="100%"
          maxWidth={500}
          p={4}
          borderRadius={0.5}
        >
          <Grid
            container
            spacing={2}
            component="form"
            onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
          >
            <FormBuilder fields={fields} />

            <Grid size={{ xs: 12 }}>
              <ButtonWithLoading
                isLoading={isPending}
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                <Typography variant="subtitle1" fontWeight={700}>
                  {t('common.buttons.continue')}
                </Typography>
              </ButtonWithLoading>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <RegisterTypography />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid size={{ xs: 12 }}>
                  <LinearFieldset title={t('common.buttons.or')} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <GoogleLoginButton />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default SignIn;
