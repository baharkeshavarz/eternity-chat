import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import FormBuilder, {
  FormBuilderProps,
} from '@/components/Fields/components/FormBuilder';
import { greyOutlinedInputBackgroundSx } from '@/utils/general';
import {
  GET_USER_PERSONALITIES_LIST_KEY,
  SAMPLE_CHAT_USER_ID,
} from '@/constants/query-keys';
import { DEFAULT_PLAYMENT_PLANS_UPGRADE_SUCCESSFUL_PAY_PATH } from '@/constants/routes';
import { useCountries } from '@/hooks/useCountries';
import { queryClient } from '@/providers/TanstackProvider';
import { permiumPlanRegister } from '@/services/payment';
import { IPremimunPlanPay } from '@/services/payment/types';
import { onInvalidSubmit } from '@/utils/form';
import { yupResolver } from '@hookform/resolvers/yup';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import PremiumPlanPriceCard from './PremiumPlanPriceCard';
import { GREY_F9_COLOR, FIXED_INPUT_MEDIUM_HEIGHT } from '@/constants/general';
import { useAppContext } from '@/hooks/useAppContext';
import { sharedDropdownFieldProps } from '@/app/[locale]/dashboard/components/common/SharedStyles';

type IPremimunPlanPayPayload = IPremimunPlanPay;

const PremiumPlanForm = () => {
  const t = useTranslations();
  const { isMobile } = useAppContext();
  const router = useRouter();
  const countriesList = useCountries();

  const formInputsBg = {
    ...greyOutlinedInputBackgroundSx(GREY_F9_COLOR),
    height: FIXED_INPUT_MEDIUM_HEIGHT,
  };

  const labels: Record<keyof IPremimunPlanPayPayload, string> = {
    cardholderName: t('common.fields.cardholderName'),
    cardNumber: t('common.fields.cardNumber'),
    cvv: t('common.fields.cvv'),
    expirationDate: t('common.fields.expirationDate'),
    address: t('common.fields.address'),
    country: t('common.fields.country'),
    province: t('common.fields.province'),
    city: t('common.fields.city'),
    postalCode: t('common.fields.postalCode'),
  };

  const resolveSchema: yup.ObjectSchema<IPremimunPlanPayPayload> = yup.object({
    cardholderName: yup
      .string()
      .nullable()
      .required()
      .label(labels.cardholderName),
    cardNumber: yup.string().nullable().required().label(labels.cardNumber),
    cvv: yup.string().nullable().required().label(labels.cvv),
    expirationDate: yup
      .string()
      .nullable()
      .required()
      .label(labels.expirationDate),
    address: yup.string().nullable().required().label(labels.address),
    country: yup.string().nullable().required().label(labels.country),
    province: yup.string().nullable().required().label(labels.province),
    city: yup.string().nullable().required().label(labels.city),
    postalCode: yup.string().nullable().required().label(labels.postalCode),
  });

  const methods = useForm<IPremimunPlanPayPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: permiumPlanRegister,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_USER_PERSONALITIES_LIST_KEY, SAMPLE_CHAT_USER_ID],
      });
    },
  });

  const onSubmit: SubmitHandler<IPremimunPlanPayPayload> = async (payload) => {
    // const { data, status } = await mutateAsync({ payload });
    // if (status === 200 && data?.message) {
    //   methods.reset();
    // }
    // onTogglePremuimTrialDialog();
    router.push(DEFAULT_PLAYMENT_PLANS_UPGRADE_SUCCESSFUL_PAY_PATH);
  };

  const fields: FormBuilderProps['fields'] = {
    cardholderName: {
      name: 'cardholderName',
      label: labels.cardholderName,
      type: 'String',
      props: {
        placeholder: t('common.fields.cardholderNameLable'),
        boldLabel: true,
        labelVariant: 'body1',
        sx: formInputsBg,
      },
      ui: {
        grid: {
          size: { xs: 6, md: 12 },
        },
      },
    },
    cardNumber: {
      name: 'cardNumber',
      label: labels.cardNumber,
      type: 'String',
      props: {
        placeholder: 'xxxx-xxxx-xxxx-xxxx',
        boldLabel: true,
        labelVariant: 'body1',
        sx: formInputsBg,
      },
      ui: {
        grid: {
          size: { xs: 6, md: 12 },
        },
      },
    },
    cvv: {
      name: 'cvv',
      label: labels.cvv,
      type: 'String',
      props: {
        placeholder: 'xxxx',
        boldLabel: true,
        labelVariant: 'body1',
        sx: formInputsBg,
      },
      ui: {
        grid: {
          size: { xs: 6, md: 12 },
        },
      },
    },
    expirationDate: {
      name: 'expirationDate',
      label: labels.expirationDate,
      type: 'String',
      props: {
        placeholder: 'xxxx',
        boldLabel: true,
        labelVariant: 'body1',
        sx: formInputsBg,
      },
      ui: {
        grid: {
          size: { xs: 6, md: 12 },
        },
      },
    },
    address: {
      name: 'address',
      label: labels.address,
      type: 'String',
      props: {
        placeholder: labels.address,
        boldLabel: true,
        labelVariant: 'body1',
        sx: formInputsBg,
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
    country: {
      name: 'country',
      label: labels.country,
      type: 'Selective',
      options: countriesList,
      props: {
        placeholder: labels.country,
        boldLabel: true,
        labelVariant: 'body1',
        sx: { ...sharedDropdownFieldProps },
      },
      ui: {
        grid: {
          size: { xs: 12, sm: 3 },
        },
      },
    },
    province: {
      name: 'province',
      label: labels.province,
      type: 'String',
      props: {
        placeholder: 'xxxx',
        boldLabel: true,
        labelVariant: 'body1',
        sx: formInputsBg,
      },
      ui: {
        grid: {
          size: { xs: 12, sm: 3 },
        },
      },
    },
    city: {
      name: 'city',
      label: labels.city,
      type: 'String',
      props: {
        placeholder: labels.city,
        boldLabel: true,
        labelVariant: 'body1',
        sx: formInputsBg,
      },
      ui: {
        grid: {
          size: { xs: 12, sm: 3 },
        },
      },
    },
    postalCode: {
      name: 'postalCode',
      label: labels.postalCode,
      type: 'String',
      props: {
        placeholder: 'xxxx',
        boldLabel: true,
        labelVariant: 'body1',
        sx: formInputsBg,
      },
      ui: {
        grid: {
          size: { xs: 12, sm: 3 },
        },
      },
    },
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={{ xs: 2, sm: 8, md: 16 }}
        minHeight={isMobile ? '0' : '100vh'}
        py={isMobile ? 2 : 0}
      >
        <FormProvider {...methods}>
          <Grid
            container
            spacing={2}
            component="form"
            onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
          >
            <Grid size={{ xs: 12 }}>
              <PremiumPlanPriceCard />
            </Grid>
            <FormBuilder fields={fields} />

            <Grid size={{ xs: 12 }}>
              <Stack spacing={2} mt={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {t('pages.paymentPlans.payment.premiumPlanNoteTitle')}
                </Typography>

                <Box display="flex" alignItems="flex-start" gap={1}>
                  <FiberManualRecordIcon
                    sx={{
                      color: 'black',
                      mt: '8px',
                      fontSize: 8,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ p: 0 }}>
                    {t(
                      'pages.paymentPlans.payment.premiumPlanNoteDescription1',
                    )}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="flex-start" gap={1}>
                  <FiberManualRecordIcon
                    sx={{
                      color: 'black',
                      mt: '8px',
                      fontSize: 8,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="subtitle1">
                    {t(
                      'pages.paymentPlans.payment.premiumPlanNoteDescription2',
                    )}
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12 }} mt={4}>
              <ButtonWithLoading
                isLoading={isPending}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
                size="large"
              >
                {t('pages.paymentPlans.payment.button')}
              </ButtonWithLoading>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>

      {/* {premuimPlanDialog && (
        <PremiumPlanDialog
          open={premuimPlanDialog}
          onClose={onTogglePremuimTrialDialog}
          sx={{ width: 500, maxWidth: isMobile ? '100%' : 500 }}
          showDialogTitle={false}
        />
      )} */}
    </>
  );
};

export default PremiumPlanForm;
