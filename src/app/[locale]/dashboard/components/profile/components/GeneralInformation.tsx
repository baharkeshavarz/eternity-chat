import { CustomSelect, CustomTextField } from '@/components/Fields';
import {
  DASHBOARD_FORM_LABELS,
  DEFAULt_MALE_AVATAR_IMAGE,
  genderList,
  relationshipList,
} from '@/constants/general';
import { GeneralInformationPayload } from '@/services/onboarding/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SaveButton from '../../common/SaveButton';
import { sharedTextFieldProps } from '../../common/SharedStyles';

const GeneralInformation = () => {
  const t = useTranslations();
  const locale = useLocale();

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
  const { control } = methods;
  const typoClass = `latoStyleRegular-${locale}`;

  return (
    <FormProvider {...methods}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          justifyContent="space-between"
          width="100%"
        >
          <Avatar
            src={DEFAULt_MALE_AVATAR_IMAGE}
            sx={{ width: 64, height: 64 }}
          />
          <Typography color="secondary.main" sx={{ cursor: 'pointer' }}>
            {t('common.fields.editImage')}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Grid container alignItems="center" py={2}>
        <Grid size={{ xs: 3 }}>
          <Typography
            variant="subtitle1"
            fontWeight={400}
            color={DASHBOARD_FORM_LABELS}
            className={typoClass}
          >
            {labels.name}
          </Typography>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <CustomTextField
            label=""
            name="name"
            placeholder="Linda Peterson"
            variant="standard"
            className={typoClass}
            {...sharedTextFieldProps}
          />
        </Grid>
      </Grid>
      <Divider />

      <Grid container alignItems="center" py={2}>
        <Grid size={{ xs: 3 }}>
          <Typography
            variant="subtitle1"
            fontWeight={400}
            color={DASHBOARD_FORM_LABELS}
            className={typoClass}
          >
            {labels.relationship}
          </Typography>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <CustomSelect name="relationship" options={relationshipList} />
        </Grid>
      </Grid>
      <Divider />
      <Grid container alignItems="center" py={2}>
        <Grid size={{ xs: 3 }}>
          <Typography
            variant="subtitle1"
            fontWeight={400}
            color={DASHBOARD_FORM_LABELS}
            className={typoClass}
          >
            {labels.gender}
          </Typography>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <CustomSelect name="gender" options={genderList} />
        </Grid>
      </Grid>

      <Box mt={4} display="flex" justifyContent="flex-end">
        <SaveButton />
      </Box>
    </FormProvider>
  );
};

export default GeneralInformation;
