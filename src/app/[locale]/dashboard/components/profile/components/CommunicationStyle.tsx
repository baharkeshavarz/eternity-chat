import { CustomTextField } from '@/components/Fields';
import { DASHBOARD_FORM_LABELS } from '@/constants/general';
import { CommunicationPayload } from '@/services/onboarding/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SaveButton from '../../common/SaveButton';
import { sharedTextFieldProps } from '../../common/SharedStyles';

const CommunicationStyle = () => {
  const t = useTranslations();
  const locale = useLocale();

  const labels: Record<keyof CommunicationPayload, string> = {
    description: 'Way of Talking',
    saying: 'Phrase',
    lovedVoice: 'Voice',
    textVoice: 'Text Messages',
  };

  const resolveSchema: yup.ObjectSchema<CommunicationPayload> = yup.object({
    description: yup.string().nullable().required().label(labels.description),
    saying: yup.string().nullable().required().label(labels.saying),
    lovedVoice: yup.string().label(labels.lovedVoice),
    textVoice: yup.string().label(labels.textVoice),
  });

  const methods = useForm<CommunicationPayload>({
    resolver: yupResolver(resolveSchema),
    defaultValues: {
      saying: 'Keep Smiling!',
    },
  });
  const { control } = methods;
  const typoClass = `latoStyleRegular-${locale}`;

  return (
    <FormProvider {...methods}>
      <Grid container alignItems="center" py={1}>
        <Grid size={{ xs: 3 }}>
          <Typography
            variant="subtitle1"
            fontWeight={400}
            color={DASHBOARD_FORM_LABELS}
            className={typoClass}
          >
            {labels.description}
          </Typography>
        </Grid>
        <Grid size={{ xs: 9 }}>
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
        <Grid size={{ xs: 3 }}>
          <Typography
            variant="subtitle1"
            fontWeight={400}
            color={DASHBOARD_FORM_LABELS}
            className={typoClass}
          >
            {labels.saying}
          </Typography>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <CustomTextField
            label=""
            name="saying"
            variant="standard"
            className={typoClass}
            {...sharedTextFieldProps}
          />
        </Grid>
      </Grid>
      <Divider />

      <Box mt={4} display="flex" justifyContent="flex-end">
        <SaveButton />
      </Box>
    </FormProvider>
  );
};

export default CommunicationStyle;
