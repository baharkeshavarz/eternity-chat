'use client';

import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import FileUploadForm from '@/components/common/FileUploadForm';
import Title from '@/components/common/Title';
import { FormBuilder } from '@/components/Fields';
import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { useAppContext } from '@/hooks/useAppContext';
import { AppearancePayload } from '@/services/onboarding/types';
import { onInvalidSubmit } from '@/utils/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SkipStep from './SkipStep';
import { useTranslations } from 'next-intl';
import { greyOutlinedInputBackgroundSx } from '@/utils/general';
import { GREY_F9_COLOR } from '@/constants/general';

interface AppearanceProsp {
  onSkip: VoidFunction;
}

const Appearance: FC<AppearanceProsp> = ({ onSkip }) => {
  const t = useTranslations();
  const { isMobile } = useAppContext();

  const labels: Record<keyof AppearancePayload, string> = {
    description: 'description',
    photo: 'photo',
  };

  const resolveSchema: yup.ObjectSchema<AppearancePayload> = yup.object({
    description: yup.string().required().label(labels.description),
    photo: yup.string().label(labels.photo),
  });

  const methods = useForm<AppearancePayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  // const { mutateAsync, isPending } = useMutation({
  //    mutationFn: AppearanceUpdate,
  // });

  const onSubmit: SubmitHandler<AppearancePayload> = async () => {
    // await mutateAsync({ payload });
    onSkip?.();
  };

  const fields: FormBuilderProps['fields'] = {
    description: {
      name: 'description',
      label: 'What did they look like?',
      type: 'String',
      props: {
        placeholder:
          'E.g., They were tall with short brown hair and often wore glasses. Their smile was warm, and they had a calming presence.',
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
            title="Appearance"
            variant={isMobile ? 'h2' : 'h1'}
            sx={{ mt: 4, mb: 2, justifyContent: 'flex-start' }}
          />
          <Grid container spacing={2}>
            <FormBuilder fields={fields} />

            <Grid size={{ xs: 12 }}>
              <FileUploadForm
                name="photo"
                label="Do you have a photo you'd like to share?"
                subLabel="Drag & drop or choose file to upload"
                acceptedFormat=".jpg,.jpeg,.png"
                acceptedFormatText="Supported formats: JPG, JPEG, PNG"
              />
            </Grid>
          </Grid>
        </Box>

        <Box mt={2}>
          <Grid container textAlign="center" spacing={2}>
            <Grid size={{ xs: 12 }}>
              <ButtonWithLoading
                // isLoading={isPending}
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

export default Appearance;
