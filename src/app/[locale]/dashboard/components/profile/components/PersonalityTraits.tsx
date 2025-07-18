import { CustomSelect, CustomTextField } from '@/components/Fields';
import {
  DASHBOARD_FORM_LABELS,
  DEFAULt_MALE_AVATAR_IMAGE,
  genderList,
  relationshipList,
} from '@/constants/general';
import { PersonalityTraitsPayload } from '@/services/onboarding/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SaveButton from '../../common/SaveButton';

const PersonalityTraits = () => {
  const t = useTranslations();
  const locale = useLocale();

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
  const { control } = methods;
  const typoClass = `latoStyleRegular-${locale}`;

  return (
    <FormProvider {...methods}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
        width="100%"
        flexDirection="column"
        p={2}
        height="100%"
      >
        <Box width="100%">
          <Grid container alignItems="center" py={2}>
            <Grid size={{ xs: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight={400}
                color={DASHBOARD_FORM_LABELS}
                className={typoClass}
              >
                {labels.favoriteActivities}
              </Typography>
            </Grid>
            <Grid size={{ xs: 9 }}>
              <CustomSelect
                name="favoriteActivities"
                options={relationshipList}
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems="center" py={2}>
            <Grid size={{ xs: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight={400}
                color={DASHBOARD_FORM_LABELS}
                className={typoClass}
              >
                {labels.personality}
              </Typography>
            </Grid>
            <Grid size={{ xs: 9 }}>
              <CustomSelect name="personality" options={genderList} />
            </Grid>
          </Grid>
        </Box>

        <Box
          flex={1}
          width="100%"
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <SaveButton />
        </Box>
      </Box>
    </FormProvider>
  );
};

export default PersonalityTraits;
