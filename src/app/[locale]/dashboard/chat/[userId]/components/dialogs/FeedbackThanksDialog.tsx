import { Dialog } from '@/components/Dialog';
import { DialogProps } from '@/components/Dialog/Dialog';
import { DEFAULT_MAX_WIDTH_469, GREY_300 } from '@/constants/general';
import { Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';
import ModalInformation from '../../../../components/ModalInformation';

export type FeedbackThanksDialogProps = DialogProps;

const FeedbackThanksDialog: FC<FeedbackThanksDialogProps> = ({ ...props }) => {
  const t = useTranslations();
  const locale = useLocale();

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
          id: 'submit',
          type: 'submit',
          children: t('pages.chat.dialogs.feedbackThanks.confirmButton'),
          variant: 'contained',
          disableElevation: true,
          color: 'primary',
          fullWidth: true,
          sx: { fontWeight: 700, mb: 4 },
          needStyling: false,
        },
      ]}
    >
      <ModalInformation
        title={t('pages.chat.dialogs.feedbackThanks.title')}
        subTitle={t('pages.chat.dialogs.feedbackThanks.subTitle')}
      >
        <Typography
          variant="body2"
          color={GREY_300}
          textAlign="center"
          className={`latoStyleRegular-${locale}`}
          px={{ xs: 2, sm: 2 }}
          mt={2}
        >
          {t('pages.chat.dialogs.feedbackThanks.description')}
        </Typography>
      </ModalInformation>
    </Dialog>
  );
};

export default FeedbackThanksDialog;
