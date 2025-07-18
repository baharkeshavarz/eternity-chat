import { CustomSelect, CustomSwitch } from '@/components/Fields';
import { useLanguages } from '@/hooks/useLanguages';
import { Locale, LOCALE_VALUES } from '@/navigation';
import { IGeneralSetting } from '@/services/iam/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SaveButton from '../../common/SaveButton';

const GeneralSetting = () => {
  const t = useTranslations();
  const locale = useLocale();
  const langs = useLanguages();

  const labels: Record<keyof IGeneralSetting, string> = {
    themeType: t('common.fields.darkTheme'),
    language: t('common.fields.language'),
    isDeleteChats: t('common.buttons.deleteAllChats'),
  };

  const resolveSchema: yup.ObjectSchema<IGeneralSetting> = yup.object({
    themeType: yup.string().nullable().required().label(labels.themeType),
    language: yup
      .mixed<Locale>()
      .oneOf(Object.values(LOCALE_VALUES) as Locale[])
      .required()
      .label(labels.language),
    isDeleteChats: yup
      .boolean()
      .nullable()
      .required()
      .label(labels.isDeleteChats),
  });

  const methods = useForm<IGeneralSetting>({
    resolver: yupResolver(resolveSchema),
  });
  const { control } = methods;

  const typoClass = `latoStyleRegular-${locale}`;
  return (
    <FormProvider {...methods}>
      <Grid container alignItems="center" py={1}>
        <Grid size={{ xs: 4 }}>
          <Typography variant="subtitle1" className={typoClass}>
            {labels.themeType}
          </Typography>
        </Grid>
        <Grid size={{ xs: 8 }} textAlign="right">
          <CustomSwitch label="" name="themeType" />
        </Grid>
      </Grid>
      <Divider />

      <Grid container alignItems="center" py={1}>
        <Grid size={{ xs: 4 }}>
          <Typography variant="subtitle1" className={typoClass}>
            {labels.language}
          </Typography>
        </Grid>
        <Grid size={{ xs: 8 }} textAlign="right" sx={{ px: 2 }}>
          <CustomSelect options={langs} />
        </Grid>
      </Grid>
      <Divider />

      <Grid container alignItems="center" py={1}>
        <Grid size={{ xs: 5 }}>
          <Typography variant="subtitle1" className={typoClass}>
            {labels.isDeleteChats}
          </Typography>
        </Grid>
        <Grid size={{ xs: 7 }} textAlign="right">
          <Button variant="text" color="error" className={typoClass}>
            {t('common.buttons.delete')}
          </Button>
        </Grid>
      </Grid>
      <Divider />

      <Box mt={4} display="flex" justifyContent="flex-end">
        <SaveButton />
      </Box>
    </FormProvider>
  );
};

export default GeneralSetting;
