import MultipleFreeSolo from '@/components/Fields/components/MultipleFreeSolo';
import {
  DASHBOARD_FORM_LABELS,
  DEFAULT_DASHBOARD_ICONS,
  PersonalityList,
} from '@/constants/general';
import { PersonalityTraitsPayload } from '@/services/onboarding/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SaveButton from '../../common/SaveButton';
import CustomMultipleAutoComplete from '@/components/Fields/components/CustomMultipleAutoComplete';
import { showOptionRightWithNoBorderSelectSx } from '../../common/SharedStyles';
import Image from 'next/image';

const PersonalityTraits = () => {
  const t = useTranslations();
  const locale = useLocale();

  const labels: Record<keyof PersonalityTraitsPayload, string> = {
    favoriteActivities: 'Favorite Activity',
    personality: 'Personality',
  };

  const resolveSchema: yup.ObjectSchema<PersonalityTraitsPayload> = yup.object({
    favoriteActivities: yup
      .array()
      .nullable()
      .required()
      .label(labels.favoriteActivities),
    personality: yup.array().label(labels.personality),
  });

  const methods = useForm<PersonalityTraitsPayload>({
    resolver: yupResolver(resolveSchema),
    defaultValues: {
      favoriteActivities: ['Movies', 'Exercise'],
      personality: [1, 2],
    },
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
        py={2}
        height="100%"
      >
        <Box width="100%">
          <Grid container alignItems="center" py={1}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography
                variant="subtitle1"
                fontWeight={400}
                color={DASHBOARD_FORM_LABELS}
                className={typoClass}
              >
                {labels.favoriteActivities}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
              <MultipleFreeSolo
                name="favoriteActivities"
                label=""
                sx={showOptionRightWithNoBorderSelectSx}
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems="center" py={1}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography
                variant="subtitle1"
                fontWeight={400}
                color={DASHBOARD_FORM_LABELS}
                className={typoClass}
              >
                {labels.personality}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
              <CustomMultipleAutoComplete
                label=""
                name="personality"
                options={PersonalityList}
                multiple={true}
                popupIcon={
                  <Image
                    src={`${DEFAULT_DASHBOARD_ICONS}/pen.png`}
                    alt="Dropdown"
                    width={16}
                    height={16}
                  />
                }
                sx={showOptionRightWithNoBorderSelectSx}
              />
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
