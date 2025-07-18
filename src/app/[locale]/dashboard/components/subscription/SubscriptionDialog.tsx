import { Box } from '@mui/material';
import { Dialog } from '@/components/Dialog';
import { DialogProps } from '@/components/Dialog/Dialog';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import PremiumUpgradeCard from './components/SubscriptionDetails';

export type SubscriptionDialogProps = DialogProps;

const SubscriptionDialog: FC<SubscriptionDialogProps> = ({ ...props }) => {
  const t = useTranslations();
  return (
    <Dialog
      {...props}
      title={t('common.buttons.subscription')}
      maxWidth="sm"
      fullWidth
      sx={{ marginX: 'auto', p: 0 }}
      dialogButtons={[]}
    >
      <PremiumUpgradeCard />
    </Dialog>
  );
};

export default SubscriptionDialog;
