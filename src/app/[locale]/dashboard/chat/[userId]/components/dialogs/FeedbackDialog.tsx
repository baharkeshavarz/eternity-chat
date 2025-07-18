import { Dialog } from '@/components/Dialog';
import { DialogProps } from '@/components/Dialog/Dialog';
import {
  DEFAULT_MAX_WIDTH_469,
  GREY_300,
  GREY_F3_COLOR,
  STEPPER_COLOR,
} from '@/constants/general';
import { Grid, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';
import ModalInformation from '../../../../components/ModalInformation';
import StarRating from '../feedback/StarRating';

import FormBuilder, {
  FormBuilderProps,
} from '@/components/Fields/components/FormBuilder';
import { IStartRankingFeedback } from '@/services/chat/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

export type FeedbackDialogProps = DialogProps;

const FeedbackDialog: FC<FeedbackDialogProps> = ({ ...props }) => {
  const t = useTranslations();
  const locale = useLocale();

  const labels: Record<keyof IStartRankingFeedback, string> = {
    star: t('pages.chat.dialogs.feedback.star'),
    message: t('pages.chat.dialogs.feedback.message'),
  };

  const resolveSchema: yup.ObjectSchema<IStartRankingFeedback> = yup.object({
    star: yup.number().min(1).max(5).required().label(labels.star),
    message: yup.string().max(500).required().label(labels.message),
  });

  const methods = useForm<IStartRankingFeedback>({
    resolver: yupResolver(resolveSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  // const { mutateAsync, isPending } = useMutation({
  //   mutationFn: 'rankFeedback',
  // });

  const onSubmit: SubmitHandler<IStartRankingFeedback> = async (payload) => {
    console.log('Feedback submitted:', payload);
  };

  const fields: FormBuilderProps['fields'] = {
    star: {
      type: 'Custom',
      component: <StarRating name="star" />,
      ui: {
        grid: {
          size: { xs: 12, sm: 12 },
        },
      },
    },
    message: {
      name: 'message',
      type: 'String',
      label: '',
      props: {
        multiline: true,
        rows: 4,
        placeholder: t('pages.chat.dialogs.feedback.messagePlaceholder'),
        sx: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: GREY_F3_COLOR,
            fontWeight: 700,
            color: STEPPER_COLOR,
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
          },
        },
      },
      ui: {
        grid: {
          size: { xs: 12, sm: 12 },
        },
      },
    },
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        {...props}
        title=""
        maxWidth="sm"
        sx={{
          marginX: 'auto',
          width: { xs: '100%', sm: DEFAULT_MAX_WIDTH_469 },
        }}
        dialogActionSx={{ width: '80%' }}
        dialogContentProps={{ sx: { p: 0 } }}
        dialogButtons={[
          {
            id: 'submit',
            type: 'submit',
            children: t('pages.chat.dialogs.feedback.confirmButton'),
            variant: 'contained',
            disableElevation: true,
            color: 'primary',
            fullWidth: true,
            sx: { fontWeight: 700, mb: 4 },
            needStyling: false,
          },
        ]}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalInformation
          title={t('pages.chat.dialogs.feedback.title')}
          icon="writing-icon.png"
        >
          <Typography
            variant="body2"
            color={GREY_300}
            textAlign="center"
            className={`latoStyleRegular-${locale}`}
            px={{ xs: 2, sm: 2 }}
          >
            {t('pages.chat.dialogs.feedback.description')}
          </Typography>
          <Grid container spacing={2}>
            <FormBuilder fields={fields} />
          </Grid>
        </ModalInformation>
      </Dialog>
    </FormProvider>
  );
};

export default FeedbackDialog;
