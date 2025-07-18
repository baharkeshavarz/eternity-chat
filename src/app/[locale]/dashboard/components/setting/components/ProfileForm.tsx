import { CustomTextField } from '@/components/Fields';
import {
  DASHBOARD_FORM_LABELS,
  DEFAULt_MALE_AVATAR_IMAGE,
} from '@/constants/general';
import { IAccountSetting } from '@/services/iam/types';
import { yupResolver } from '@hookform/resolvers/yup';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Avatar, Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SaveButton from '../../common/SaveButton';
import { sharedTextFieldProps } from '../../common/SharedStyles';

const ProfileForm = () => {
  const t = useTranslations();
  const locale = useLocale();

  const labels: Record<keyof IAccountSetting, string> = {
    name: t('common.fields.name'),
    email: t('common.fields.email'),
    password: t('common.fields.password'),
  };

  const resolveSchema: yup.ObjectSchema<IAccountSetting> = yup.object({
    name: yup.string().nullable().required().label(labels.name),
    email: yup.string().nullable().required().label(labels.email),
    password: yup.string().nullable().required().label(labels.password),
  });

  const methods = useForm<IAccountSetting>({
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
            {labels.email}
          </Typography>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <CustomTextField
            label=""
            name="email"
            type="email"
            placeholder={t('common.fields.emailPlaceholder')}
            variant="standard"
            className={typoClass}
            {...sharedTextFieldProps}
          />
        </Grid>
      </Grid>
      <Divider />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py={2}
      >
        <Typography
          variant="subtitle1"
          fontWeight={400}
          color={DASHBOARD_FORM_LABELS}
          className={typoClass}
        >
          {t('common.buttons.changePassword')}
        </Typography>
        <ChevronRightIcon />
      </Box>
      <Divider />

      <Box py={2}>
        <Button variant="text" color="error">
          {t('common.buttons.logout')}
        </Button>
      </Box>

      <Box mt={4} display="flex" justifyContent="flex-end">
        <SaveButton />
      </Box>
    </FormProvider>
  );
};

export default ProfileForm;
