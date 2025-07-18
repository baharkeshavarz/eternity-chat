'use client';

import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import Title from '@/components/common/Title';
import { FormBuilder } from '@/components/Fields';
import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { useAppContext } from '@/hooks/useAppContext';
import { generalInformationUpdate } from '@/services/onboarding';
import { GeneralInformationPayload } from '@/services/onboarding/types';
import { onInvalidSubmit } from '@/utils/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SkipStep from './SkipStep';
import { genderList, relationshipList } from '@/constants/general';

type GeneralInformationProps = {
  onSkip: () => void;
};

const GeneralInformation: FC<GeneralInformationProps> = ({ onSkip }) => {
  const t = useTranslations();
  const { isMobile } = useAppContext();

  const labels: Record<keyof GeneralInformationPayload, string> = {
    name: 'Name',
    relationship: 'Relationship',
    gender: 'Gender',
  };

  const resolveSchema: yup.ObjectSchema<GeneralInformationPayload> = yup.object(
    {
      name: yup.string().nullable().required().label(labels.name),
      relationship: yup
        .string()
        .nullable()
        .required()
        .label(labels.relationship),
      gender: yup.string().nullable().required().label(labels.gender),
    },
  );
  const methods = useForm<GeneralInformationPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: generalInformationUpdate,
  });

  const onSubmit: SubmitHandler<GeneralInformationPayload> = async (
    payload,
  ) => {
    // await mutateAsync({ payload });
    onSkip?.();
  };

  const fields: FormBuilderProps['fields'] = {
    name: {
      name: 'name',
      label: 'What was their name?*',
      type: 'String',
      props: {
        placeholder: t('common.fields.namePlaceholder'),
        boldLabel: true,
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
    relationship: {
      name: 'relationship',
      label: 'What was your relationship with them?',
      type: 'Selective',
      options: relationshipList || [],
      props: {
        placeholder: 'What was your relationship with them?',
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
    gender: {
      name: 'gender',
      label: 'Their Gender (Optional)',
      type: 'Selective',
      options: genderList || [],
      props: {
        placeholder: 'Their Gender (Optional)',
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
  };

  return (
    <FormProvider {...methods}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        width="100%"
        flex={1}
        px={2}
        component="form"
        onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
      >
        <Box>
          <Title
            title="General Information"
            variant={isMobile ? 'h2' : 'h1'}
            sx={{ mt: 4, mb: 2, justifyContent: 'flex-start' }}
          />
          <Grid container spacing={2}>
            <FormBuilder fields={fields} />
          </Grid>
        </Box>
        <Box mt={2}>
          <Grid container textAlign="center" spacing={2}>
            <Grid size={{ xs: 12 }}>
              <ButtonWithLoading
                isLoading={isPending}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                <Typography variant="subtitle1" fontWeight={700}>
                  {t('common.buttons.continue')}
                </Typography>
              </ButtonWithLoading>
              <SkipStep onSkip={onSkip} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default GeneralInformation;
