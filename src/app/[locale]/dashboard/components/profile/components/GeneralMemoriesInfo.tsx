import {
  CustomDatePicker,
  CustomSelect,
  CustomTextField,
} from '@/components/Fields';
import { DASHBOARD_FORM_LABELS, genderList } from '@/constants/general';
import { MemoriesPayload } from '@/services/onboarding/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import CustomDropdownIcon from '../../common/CustomDropdownIcon';
import SaveButton from '../../common/SaveButton';
import {
  sharedDatePickerFieldProps,
  sharedTextFieldProps,
  showOptionRightWithNoBorderSelectSx,
} from '../../common/SharedStyles';
const GeneralMemoriesInfo = () => {
  const t = useTranslations();
  const locale = useLocale();

  const labels: Record<keyof MemoriesPayload, string> = {
    description: 'Cherished Memory',
    receiveReminderDate: 'Meaningful Date',
  };

  const resolveSchema: yup.ObjectSchema<Partial<MemoriesPayload>> = yup.object({
    description: yup.string().nullable().required().label(labels.description),
    receiveReminderDate: yup.string().label(labels.receiveReminderDate),
  });

  const methods = useForm<Partial<MemoriesPayload>>({
    resolver: yupResolver(resolveSchema),
    defaultValues: {
      description: 'The Parisian Cafe in November that...',
      receiveReminderDate: '1996/10/04',
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
            <Grid size={{ xs: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight={400}
                color={DASHBOARD_FORM_LABELS}
                className={typoClass}
              >
                {labels.receiveReminderDate}
              </Typography>
            </Grid>
            <Grid size={{ xs: 9 }}>
              <CustomDatePicker
                name="receiveReminderDate"
                label=""
                sx={sharedDatePickerFieldProps}
              />
            </Grid>
          </Grid>
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

export default GeneralMemoriesInfo;
