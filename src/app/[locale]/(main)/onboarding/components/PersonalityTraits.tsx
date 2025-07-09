'use client';

import Title from '@/components/common/Title';
import { FormBuilder } from '@/components/Fields';
import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { PersonalityTraitsPayload } from '@/services/onboarding/types';
import { onInvalidSubmit } from '@/utils/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Typography } from '@mui/material';
import { FC, Fragment, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SkipStep from './SkipStep';
import { GREY_F9_COLOR, PersonalityList } from '@/constants/general';
import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import { useTranslations } from 'next-intl';
import { greyOutlinedInputBackgroundSx } from '@/utils/general';
import { useAppContext } from '@/hooks/useAppContext';

interface GeneralInformationProps {
  onSkip: VoidFunction;
}

const PersonalityTraits: FC<GeneralInformationProps> = ({ onSkip }) => {
  const t = useTranslations();
  const { isMobile } = useAppContext();
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  const handleToggle = (trait: string) => {
    setSelectedTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait],
    );
  };

  const labels: Record<keyof PersonalityTraitsPayload, string> = {
    favoriteActivities: 'Favorite Activities',
    personality: 'Personality',
  };

  const resolveSchema: yup.ObjectSchema<PersonalityTraitsPayload> = yup.object({
    favoriteActivities: yup
      .string()
      .nullable()
      .required()
      .label(labels.favoriteActivities),
    personality: yup.array().label(labels.personality),
  });

  const methods = useForm<PersonalityTraitsPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<PersonalityTraitsPayload> = async (payload) => {
    // await mutateAsync({ payload });
    onSkip?.();
  };

  const fields: FormBuilderProps['fields'] = {
    favoriteActivities: {
      name: 'favoriteActivities',
      label: 'Did they have any hobbies or favorite activities?',
      type: 'String',
      props: {
        placeholder: 'Type Here',
        boldLabel: true,
        multiline: true,
        rows: 6,
        sx: greyOutlinedInputBackgroundSx(GREY_F9_COLOR),
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
    personalityLabel: {
      type: 'Custom',
      component: (
        <Typography variant="subtitle1" fontWeight={700} pt={3}>
          Which words best describe their personality?
        </Typography>
      ),
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
  };

  return (
    <FormProvider {...methods}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        width="100%"
        flex={1}
        px={2}
        component="form"
        onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
      >
        <Box>
          <Title
            title="Personality Traits"
            variant={isMobile ? 'h2' : 'h1'}
            sx={{ mt: 4, mb: 2, justifyContent: 'flex-start' }}
          />
          <Grid container spacing={2}>
            <FormBuilder fields={fields} />

            <Grid size={{ xs: 12 }}>
              <Box display="flex" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
                {PersonalityList.map((trait) => (
                  <Fragment key={trait.value as string}>
                    <Button
                      variant={
                        selectedTraits.includes(trait.value as string)
                          ? 'contained'
                          : 'outlined'
                      }
                      onClick={() => handleToggle(trait.value as string)}
                      sx={{
                        textTransform: 'none',
                        borderRadius: '30px',
                        px: 1.8,
                        py: 1,
                        fontSize: 16,
                      }}
                    >
                      {trait.label}
                    </Button>
                  </Fragment>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box mt={2}>
          <Grid size={{ xs: 12 }} textAlign="center">
            <ButtonWithLoading
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              <Typography variant="subtitle1" fontWeight={700}>
                {t('common.buttons.continue')}
              </Typography>
            </ButtonWithLoading>
            <SkipStep onSkip={onSkip} />
          </Grid>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default PersonalityTraits;
