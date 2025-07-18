import { Dialog } from '@/components/Dialog';
import { DialogProps } from '@/components/Dialog/Dialog';
import {
  DEFAULT_MAX_WIDTH_469,
  GREY_300,
  STEPPER_COLOR,
} from '@/constants/general';
import { Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';
import ModalInformation from '../../../../components/ModalInformation';

export type DeleteChatDialogProps = DialogProps;

const DeleteChatDialog: FC<DeleteChatDialogProps> = ({ ...props }) => {
  const t = useTranslations();
  const locale = useLocale();
  const onClose = () => props.onClose?.({}, 'backdropClick');

  const handleClickOnSignOut = async () => {};

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
          children: t('pages.chat.dialogs.deleteChat.cancelButton'),
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
          children: t('pages.chat.dialogs.deleteChat.confirmButton'),
          variant: 'text',
          fullWidth: true,
          sx: { color: STEPPER_COLOR, fontWeight: 700 },
          onClick: handleClickOnSignOut,
          needStyling: false,
        },
      ]}
    >
      <ModalInformation
        title={t('pages.chat.dialogs.deleteChat.title')}
        icon="trash-basket.png"
      >
        <Typography
          variant="body2"
          color={GREY_300}
          textAlign="center"
          className={`latoStyleRegular-${locale}`}
          px={{ xs: 2, sm: 2 }}
        >
          {t('pages.chat.dialogs.deleteChat.description')}
        </Typography>
      </ModalInformation>
    </Dialog>
  );
};

export default DeleteChatDialog;
