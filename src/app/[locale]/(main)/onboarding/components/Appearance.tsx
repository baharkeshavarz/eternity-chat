'use client';

import Title from '@/components/common/Title';
import { FormBuilder } from '@/components/Fields';
import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import FileUploadForm from '@/components/common/FileUploadForm';
import GradientButtonWithLoading from '@/components/common/GradientButtonWithLoading';
import { AppearancePayload } from '@/services/onboarding/types';
import { onInvalidSubmit } from '@/utils/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SkipStep from './SkipStep';
import { FC } from 'react';

interface AppearanceProsp {
  onSkip: VoidFunction;
}

const Appearance: FC<AppearanceProsp> = ({ onSkip }) => {
  const labels: Record<keyof AppearancePayload, string> = {
    description: 'description',
    photo: 'photo',
  };

  const resolveSchema: yup.ObjectSchema<AppearancePayload> = yup.object({
    description: yup.string().nullable().required().label(labels.description),
    photo: yup.string().nullable().required().label(labels.photo),
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
        minRows: 8,
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      minHeight="100vh"
      p={4}
    >
      <FormProvider {...methods}>
        <Title
          title="Appearance"
          sx={{ my: 5, justifyContent: 'flex-start' }}
        />
        <Grid
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        >
          <FormBuilder fields={fields} />

          <Grid size={{ xs: 12 }}>
            <FileUploadForm
              name="photo"
              label="Do you have a photo you'd like to share?"
              acceptedFormat=".jpg,.jpeg,.png"
              acceptedFormatText="Supported formats: JPG, JPEG, PNG"
            />
          </Grid>

          <Grid size={{ xs: 12 }} textAlign="center">
            <GradientButtonWithLoading
              // isLoading={isPending}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              Continue
            </GradientButtonWithLoading>
            <SkipStep onSkip={onSkip} />
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
};

export default Appearance;
