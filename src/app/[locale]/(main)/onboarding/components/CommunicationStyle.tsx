'use client';

import Title from '@/components/common/Title';
import { FormBuilder } from '@/components/Fields';
import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import FileUploadForm from '@/components/common/FileUploadForm';
import { CommunicationPayload } from '@/services/onboarding/types';
import { onInvalidSubmit } from '@/utils/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SkipStep from './SkipStep';
import { useAppContext } from '@/hooks/useAppContext';
import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import { GREY_F9_COLOR } from '@/constants/general';
import { greyOutlinedInputBackgroundSx } from '@/utils/general';
import { useTranslations } from 'next-intl';

interface CommunicationStyleProps {
  onSkip: VoidFunction;
}

const CommunicationStyle: FC<CommunicationStyleProps> = ({ onSkip }) => {
  const t = useTranslations();
  const { isMobile } = useAppContext();
  const labels: Record<keyof CommunicationPayload, string> = {
    description: 'description',
    saying: 'saying',
    lovedVoice: 'Loved Voice',
    textVoice: 'Text Voice',
  };

  const resolveSchema: yup.ObjectSchema<CommunicationPayload> = yup.object({
    description: yup.string().nullable().required().label(labels.description),
    saying: yup.string().nullable().required().label(labels.saying),
    lovedVoice: yup.string().label(labels.lovedVoice),
    textVoice: yup.string().label(labels.textVoice),
  });

  const methods = useForm<CommunicationPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;
  const { isPending } = useMutation({
    // mutationFn: AppearanceUpdate,
  });

  const onSubmit: SubmitHandler<CommunicationPayload> = async () => {
    //   await mutateAsync({ payload });
    onSkip?.();
  };

  const fields: FormBuilderProps['fields'] = {
    description: {
      name: 'description',
      label: 'How would you describe their way of talking?',
      type: 'String',
      props: {
        placeholder:
          'E.g., They spoke with a warm and friendly tone, often using kind words and gentle humor. Their messages were thoughtful and supportive.',
        boldLabel: true,
        multiline: true,
        minRows: 6,
        sx: greyOutlinedInputBackgroundSx(GREY_F9_COLOR),
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
    photo: {
      name: 'saying',
      label: 'Is there a particular phrase or saying they used often?',
      type: 'String',
      props: {
        placeholder: "E.g., 'Keep smiling!",
        boldLabel: true,
        sx: greyOutlinedInputBackgroundSx(GREY_F9_COLOR),
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
            title="Communication Style"
            variant={isMobile ? 'h3' : 'h1'}
            sx={{ mt: 4, mb: 2, justifyContent: 'flex-start' }}
          />
          <Grid container spacing={3}>
            <FormBuilder fields={fields} />

            <Grid size={{ xs: 12, sm: 6 }}>
              <FileUploadForm
                name="lovedVoice"
                label="Upload a voice recording"
                subLabel="Drag & drop or choose file to upload"
                acceptedFormat=".mp3,wav"
                acceptedFormatText="Supported formats: MP3, WAV"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FileUploadForm
                name="textVoice"
                label="Upload a text message"
                subLabel="Drag & drop or choose file to upload"
                acceptedFormat=".txt"
                acceptedFormatText="Supported formats: TXT"
              />
            </Grid>
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

export default CommunicationStyle;
