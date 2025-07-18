import { Dialog } from '@/components/Dialog';
import { DialogProps } from '@/components/Dialog/Dialog';
import {
  DEFAULT_MAX_WIDTH_469,
  GREY_300,
  STEPPER_COLOR,
} from '@/constants/general';
import { DEFAULT_SIGNUP_PATH } from '@/constants/routes';
import { Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import ModalInformation from '../ModalInformation';

export type LogoutDialogProps = DialogProps;

const LogoutDialog: FC<LogoutDialogProps> = ({ ...props }) => {
  const t = useTranslations();
  const locale = useLocale();

  const router = useRouter();
  const onClose = () => props.onClose?.({}, 'backdropClick');

  const handleClickOnSignOut = async () => {
    router.push(DEFAULT_SIGNUP_PATH);
  };

  return (
    <Dialog
      {...props}
      title=""
      maxWidth="sm"
      sx={{ marginX: 'auto', width: { xs: '100%', sm: DEFAULT_MAX_WIDTH_469 } }}
      dialogActionSx={{ width: '80%' }}
      dialogContentProps={{ sx: { p: 0 } }}
      dialogButtons={[
        {
          id: 'cancel',
          type: 'button',
          children: t('pages.chat.dialogs.logout.cancelButton'),
          variant: 'contained',
          disableElevation: true,
          color: 'primary',
          fullWidth: true,
          sx: { fontWeight: 700 },
          onClick: onClose,
          needStyling: false,
        },
        {
          id: 'submit',
          type: 'submit',
          children: t('pages.chat.dialogs.logout.confirmButton'),
          variant: 'text',
          fullWidth: true,
          sx: { color: STEPPER_COLOR, fontWeight: 700 },
          onClick: handleClickOnSignOut,
          needStyling: false,
        },
      ]}
    >
      <ModalInformation
        title={t('pages.chat.dialogs.logout.title')}
        icon="leave-door.png"
      >
        <Typography
          variant="body2"
          color={GREY_300}
          textAlign="center"
          className={`latoStyleRegular-${locale}`}
          px={{ xs: 2, sm: 2 }}
        >
          {t('pages.chat.dialogs.logout.description')}
        </Typography>
      </ModalInformation>
    </Dialog>
  );
};

export default LogoutDialog;
