import { Box } from '@mui/material';
import { Dialog } from '@/components/Dialog';
import { DialogProps } from '@/components/Dialog/Dialog';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import NotificationsList from './components/NotificationsList';
import NotificationsFilter from './components/NotificationsFilter';

export type NotificationDialogProps = DialogProps;

const NotificationDialog: FC<NotificationDialogProps> = ({ ...props }) => {
  const t = useTranslations();
  return (
    <Dialog
      {...props}
      title={t('common.buttons.notifications')}
      maxWidth="sm"
      fullWidth
      sx={{ marginX: 'auto', p: 0 }}
      dialogContentProps={{ sx: { p: 0 } }}
      dialogButtons={[]}
    >
      <Box width="100%" display="flex" flexDirection="column">
        <NotificationsFilter />
        <NotificationsList />
      </Box>
    </Dialog>
  );
};

export default NotificationDialog;
