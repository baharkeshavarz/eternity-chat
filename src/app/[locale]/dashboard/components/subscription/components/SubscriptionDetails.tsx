'use client';

import RoundedIcon from '@/components/common/RoundedIcon';
import {
  DEFAULT_DASHBOARD_ICONS,
  FIXED_LINEAR_PROGRESS,
  LAYOUT_BACKGROUND_BLUE,
} from '@/constants/general';
import {
  Box,
  LinearProgress,
  Stack,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import SaveButton from '../../common/SaveButton';

const PremiumUpgradeCard = () => {
  const t = useTranslations();
  const locale = useLocale();

  const daysLeft = 6;
  const progressValue = ((7 - daysLeft) / 7) * 100;
  const typoClass = `latoStyleRegular-${locale}`;

  return (
    <>
      <Box
        width="100%"
        sx={{
          backgroundColor: LAYOUT_BACKGROUND_BLUE,
          borderRadius: 0.7,
          p: { xs: 2, sm: 3, md: 4 },
          mb: 4,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          width="100%"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <RoundedIcon
              width={35}
              height={35}
              sxProp={{
                backgroundColor: 'white',
                width: 50,
                height: 50,
              }}
              icon={
                <Image
                  alt=""
                  width={21}
                  height={21}
                  src={`${DEFAULT_DASHBOARD_ICONS}/star-shiny-blue.png`}
                />
              }
            />

            <Typography variant="subtitle1" fontWeight={700}>
              Free Plan ({daysLeft} Days Left)
            </Typography>
          </Stack>

          <Box width={{ xs: '100%', sm: FIXED_LINEAR_PROGRESS }}>
            <LinearProgress
              variant="determinate"
              value={progressValue}
              sx={{
                mt: { xs: 1, sm: 0 },
                height: 10,
                borderRadius: 0.5,
                backgroundColor: 'white',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'secondary.dark',
                },
              }}
            />
          </Box>
        </Stack>
      </Box>

      {/* Upgrade Title and Description */}
      <Typography variant="body2" fontWeight={700}>
        Upgrade to Premium
      </Typography>
      <Typography
        variant="subtitle1"
        my={2}
        className={typoClass}
        sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
      >
        Experience the full power of AI memory and presence.111
      </Typography>

      {/* Feature List */}
      <List dense disablePadding>
        {[
          'Voice Calls – Hear your loved one’s voice again',
          'Deep Memory Recall – Simulate shared stories and emotional moments',
          'Custom Personality Tuning – Adjust tone, mood, and conversation style',
          'Unlimited Text Chat',
          'Priority Support',
          '7-Day Free Trial — You won’t be charged today',
        ].map((text, idx) => (
          <ListItem key={idx} disableGutters>
            <ListItemText
              primary={`• ${text}`}
              slotProps={{
                primary: {
                  variant: 'subtitle1',
                  className: typoClass,
                },
              }}
            />
          </ListItem>
        ))}
      </List>

      <Stack direction="row" justifyContent="flex-end" mt={4}>
        <SaveButton>{t('common.buttons.upgradeTopremium')}</SaveButton>
      </Stack>
    </>
  );
};

export default PremiumUpgradeCard;
