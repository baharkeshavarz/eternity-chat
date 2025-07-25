import { CustomTextField } from '@/components/Fields';
import { DASHBOARD_FORM_LABELS } from '@/constants/general';
import { AppearancePayload } from '@/services/onboarding/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SaveButton from '../../common/SaveButton';
import { sharedTextFieldProps } from '../../common/SharedStyles';

const Appearance = () => {
  const t = useTranslations();
  const locale = useLocale();

  const labels: Record<keyof AppearancePayload, string> = {
    description: 'Appearance Description',
    photo: 'Pictures',
  };

  const resolveSchema: yup.ObjectSchema<AppearancePayload> = yup.object({
    description: yup.string().required().label(labels.description),
    photo: yup.string().label(labels.photo),
  });

  const methods = useForm<AppearancePayload>({
    resolver: yupResolver(resolveSchema),
    defaultValues: {
      description: 'tall with short brown hair and often...',
    },
  });
  const { control } = methods;
  const typoClass = `latoStyleRegular-${locale}`;

  return (
    <FormProvider {...methods}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
        width="100%"
        flexDirection="column"
        py={2}
        height="100%"
      >
        <Box width="100%">
          <Grid container alignItems="center" py={1}>
            <Grid size={{ xs: 5 }}>
              <Typography
                variant="subtitle1"
                fontWeight={400}
                color={DASHBOARD_FORM_LABELS}
                className={typoClass}
              >
                {labels.description}
              </Typography>
            </Grid>
            <Grid size={{ xs: 7 }}>
              <CustomTextField
                label=""
                name="description"
                variant="standard"
                className={typoClass}
                {...sharedTextFieldProps}
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems="center" py={1}>
            <Grid size={{ xs: 5 }}>
              <Typography
                variant="subtitle1"
                fontWeight={400}
                color={DASHBOARD_FORM_LABELS}
                className={typoClass}
              >
                {labels.photo}
              </Typography>
            </Grid>
            <Grid size={{ xs: 7 }}>
              <Box display="flex" justifyContent="flex-end" width="100%">
                <Typography color="secondary.main" sx={{ cursor: 'pointer' }}>
                  Add
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider />
        </Box>

        <Box
          flex={1}
          width="100%"
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <SaveButton />
        </Box>
      </Box>
    </FormProvider>
  );
};

export default Appearance;
