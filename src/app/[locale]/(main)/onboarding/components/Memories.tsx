'use client';

import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import Title from '@/components/common/Title';
import { FormBuilder } from '@/components/Fields';
import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { GREY_F9_COLOR } from '@/constants/general';
import {
  DEFAULT_ONBOARDING_COMPLETE_PATH,
  DEFAULT_PRICING_PATH,
} from '@/constants/routes';
import { useAppContext } from '@/hooks/useAppContext';
import { MemoriesPayload } from '@/services/onboarding/types';
import { onInvalidSubmit } from '@/utils/form';
import { greyOutlinedInputBackgroundSx } from '@/utils/general';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SkipStep from './SkipStep';
import MemoriesSocialConnet from './MemoriesSocialConnet';

interface MemoriesProps {
  onSkip: VoidFunction;
}

const Memories: FC<MemoriesProps> = ({ onSkip }) => {
  const t = useTranslations();
  const router = useRouter();
  const { isMobile } = useAppContext();

  const labels: Record<keyof MemoriesPayload, string> = {
    description: 'description',
    receiveReminderDate: 'receiveReminderDate',
  };

  const resolveSchema: yup.ObjectSchema<Partial<MemoriesPayload>> = yup.object({
    description: yup.string().nullable().required().label(labels.description),
    receiveReminderDate: yup.string().label(labels.receiveReminderDate),
  });

  const methods = useForm<Partial<MemoriesPayload>>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  // const { mutateAsync, isPending } = useMutation({
  //   mutationFn: MemoriesUpdate,
  // });

  const onSubmit: SubmitHandler<Partial<MemoriesPayload>> = async () => {
    // await mutateAsync({ payload });
    router.push(DEFAULT_PRICING_PATH);
  };

  const fields: FormBuilderProps['fields'] = {
    description: {
      name: 'description',
      label: 'What is your most cherished memory with them?',
      type: 'String',
      props: {
        placeholder: 'Type a short description',
        multiline: true,
        minRows: 6,
        boldLabel: true,
        sx: greyOutlinedInputBackgroundSx(GREY_F9_COLOR),
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
    receiveReminderDate: {
      name: 'receiveReminderDate',
      type: 'Date',
      label:
        "If you'd like, you can provide a meaningful date to receive a gentle reminder.",
      props: {
        boldLabel: true,
        labelVariant: 'subtitle1',
        sx: {
          bgcolor: GREY_F9_COLOR,
          height: 50,
        },
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
            title="Memories"
            variant={isMobile ? 'h2' : 'h1'}
            sx={{ mt: 4, mb: 2, justifyContent: 'flex-start' }}
          />
          <Grid container spacing={2}>
            <FormBuilder fields={fields} />
            <Grid size={{ xs: 12 }}>
              <MemoriesSocialConnet />
            </Grid>
          </Grid>
        </Box>
        <Box mt={2}>
          <Grid container textAlign="center" spacing={2}>
            <Grid size={{ xs: 12 }}>
              <ButtonWithLoading
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

export default Memories;
