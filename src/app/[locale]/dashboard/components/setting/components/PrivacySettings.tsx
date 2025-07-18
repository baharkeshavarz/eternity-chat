import RollbackSwitch from '@/components/RollbackSwitch/RollbackSwitch';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback } from 'react';

const PrivacySettings = () => {
  const t = useTranslations();
  const locale = useLocale();

  const onChange = useCallback((key: string, value: boolean) => {
    console.log(`Changed ${key} to`, value);
  }, []);

  const typoClass = `latoStyleRegular-${locale}`;
  return (
    <>
      <Grid container alignItems="center" py={2}>
        <Grid size={{ xs: 11 }}>
          <Typography variant="subtitle1" className={typoClass}>
            {t('pages.settings.privacy.twoFactorAuthentication')}
          </Typography>
        </Grid>
        <Grid size={{ xs: 1 }}>
          <RollbackSwitch
            size="small"
            value={false}
            onChange={() => onChange('twoFactorAuthentication', true)}
          />
        </Grid>
      </Grid>
      <Divider />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py={2.5}
      >
        <Typography variant="subtitle1" className={typoClass}>
          {t('pages.settings.privacy.sessionManagement')}
        </Typography>
        <ChevronRightIcon />
      </Box>
      <Divider />

      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button variant="contained"> {t('common.buttons.saveChanges')}</Button>
      </Box>
    </>
  );
};

export default PrivacySettings;
