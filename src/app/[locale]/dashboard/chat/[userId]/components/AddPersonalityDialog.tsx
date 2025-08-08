import useGenderList from '@/app/[locale]/(main)/hooks/useGenderList';
import useToneList from '@/app/[locale]/(main)/hooks/useToneList';
import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import { Dialog } from '@/components/Dialog';
import { DialogProps } from '@/components/Dialog/Dialog';
import { Option } from '@/components/Fields';
import FormBuilder, {
  FormBuilderProps,
} from '@/components/Fields/components/FormBuilder';
import { PersonalityList } from '@/constants/general';
import {
  GET_USER_PERSONALITIES_LIST_KEY,
  SAMPLE_CHAT_USER_ID,
} from '@/constants/query-keys';
import { queryClient } from '@/providers/TanstackProvider';
import { GenderEnum, ToneEnum } from '@/services/common/types';
import { createPersonality } from '@/services/personality';
import { ICreatePersonality } from '@/services/personality/types';
import { onInvalidSubmit } from '@/utils/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

export type AddPersonalityDialogProps = DialogProps;
type ICreatePersonalityPayload = Omit<ICreatePersonality, 'user_id'>;

const AddPersonalityDialog: FC<AddPersonalityDialogProps> = ({ ...props }) => {
  const t = useTranslations();
  const tons = useToneList();
  const tonsList = Object.entries(tons).map(([key, value]) => {
    return {
      id: key,
      value: key,
      label: value.title,
    } as Option;
  });

  const genders = useGenderList();
  const genderList = Object.entries(genders).map(([key, value]) => {
    return {
      id: key,
      value: key,
      label: value.title,
    } as Option;
  });

  const labels: Record<keyof ICreatePersonalityPayload, string> = {
    age: t('common.fields.age'),
    name: t('common.fields.name'),
    occupation: t('common.fields.occupation'),
    gender: t('common.fields.gender'),
    tone: t('common.fields.tone'),
    personality: t('common.fields.personality'),
  };

  const resolveSchema: yup.ObjectSchema<ICreatePersonalityPayload> = yup.object(
    {
      age: yup.number().nullable().required().label(labels.age),
      name: yup.string().nullable().required().label(labels.name),
      occupation: yup.string().nullable().required().label(labels.occupation),
      gender: yup
        .mixed<GenderEnum>()
        .oneOf(Object.values(GenderEnum))
        .nullable()
        .required()
        .label(labels.gender),
      tone: yup
        .mixed<ToneEnum>()
        .oneOf(Object.values(ToneEnum))
        .nullable()
        .required()
        .label(labels.tone),
      personality: yup.string().nullable().required().label(labels.personality),
    },
  );

  const methods = useForm<ICreatePersonalityPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createPersonality,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_USER_PERSONALITIES_LIST_KEY, SAMPLE_CHAT_USER_ID],
      });
    },
  });

  const onSubmit: SubmitHandler<ICreatePersonalityPayload> = async (
    payload,
  ) => {
    const newPayload = {
      ...payload,
      user_id: SAMPLE_CHAT_USER_ID,
    };
    const response = await mutateAsync({ payload: newPayload });
    if (response?.status === 200 && response?.data?.message) {
      methods.reset();
      props.onClose?.({}, 'backdropClick');
    } else {
      toast.error(t('messages.somethingWentWrong'));
      // TODO: Handle error appropriately
      // e.g. {"detail":"Personality 'Sara' already exists"}
    }
  };

  const fields: FormBuilderProps['fields'] = {
    age: {
      name: 'age',
      label: labels.age,
      type: 'String',
      props: {
        placeholder: labels.age,
      },
      ui: {
        grid: {
          size: { xs: 12, sm: 6 },
        },
      },
    },
    name: {
      name: 'name',
      label: labels.name,
      type: 'String',
      props: {
        placeholder: labels.name,
      },
      ui: {
        grid: {
          size: { xs: 12, sm: 6 },
        },
      },
    },
    gender: {
      type: 'Selective',
      label: labels.gender,
      name: 'gender',
      options: genderList,
      ui: {
        grid: {
          size: { xs: 12, sm: 6 },
        },
      },
    },
    occupation: {
      name: 'occupation',
      label: labels.occupation,
      type: 'String',
      props: {
        placeholder: labels.occupation,
      },
      ui: {
        grid: {
          size: { xs: 12, sm: 6 },
        },
      },
    },
    tone: {
      type: 'Selective',
      label: labels.tone,
      name: 'tone',
      options: tonsList,
      ui: {
        grid: {
          size: { xs: 12, sm: 6 },
        },
      },
    },
    personality: {
      type: 'Selective',
      label: labels.personality,
      name: 'personality',
      options: PersonalityList,
      ui: {
        grid: {
          size: { xs: 12, sm: 6 },
        },
      },
    },
  };

  return (
    <Dialog
      {...props}
      title={t('pages.chat.addPersonality')}
      maxWidth="sm"
      sx={{ marginX: 'auto' }}
      dialogButtons={[]}
    >
      <FormProvider {...methods}>
        <Grid
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        >
          <FormBuilder fields={fields} />
          <Grid size={{ xs: 12 }}>
            <Box mt={4} display="flex" justifyContent="flex-end">
              <ButtonWithLoading
                isLoading={isPending}
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
                size="large"
              >
                {t('common.buttons.submit')}
              </ButtonWithLoading>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </Dialog>
  );
};

export default AddPersonalityDialog;
