import RollbackSwitch from '@/components/RollbackSwitch/RollbackSwitch';
import { Divider, Grid, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback } from 'react';

const NotificationPreference = () => {
  const t = useTranslations();
  const locale = useLocale();

  const items = [
    {
      key: 'email',
      title: t('pages.settings.notifications.email'),
      defaultValue: false,
    },
    {
      key: 'inApp',
      title: t('pages.settings.notifications.inApp'),
      defaultValue: true,
    },
    {
      key: 'push',
      title: t('pages.settings.notifications.push'),
      defaultValue: true,
    },
  ];

  const onChange = useCallback((key: string, value: boolean) => {
    console.log(`Changed ${key} to`, value);
  }, []);

  const typoClass = `latoStyleRegular-${locale}`;

  return (
    <>
      {items?.map((item) => (
        <>
          <Grid container py={2.5} key={item.key}>
            <Grid size={{ xs: 6 }}>
              <Typography variant="subtitle1" className={typoClass}>
                {item.title}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }} textAlign="right">
              <RollbackSwitch
                size="small"
                value={item.defaultValue}
                onChange={() => onChange(item.key, true)}
              />
            </Grid>
          </Grid>
          <Divider />
        </>
      ))}
    </>
  );
};

export default NotificationPreference;
