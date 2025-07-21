'use client';

import SizedButton from '@/components/common/SizedButton';
import {
  ONBOARDING_BG_COLOR,
  ONBOARDING_GRID_IMAGES,
} from '@/constants/general';
import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

const OnboardingHealing = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      sx={{
        position: 'relative',
        minHeight: { xs: 400, sm: 700, md: 800 },
        my: { xs: 10, sm: 0 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: { xs: '10%' },
          width: { xs: 280, sm: 380, md: 430 },
          height: { xs: 280, sm: 430, md: 536 },
          bgcolor: ONBOARDING_BG_COLOR,
          borderRadius: 0.5,
          overflow: 'hidden',
        }}
      >
        <Image
          src={`${ONBOARDING_GRID_IMAGES}/chris.png`}
          alt="Chris"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: { xs: '60%', sm: '65%', md: '60%' },
          left: { xs: '5%', sm: '4%', md: '0%' },
          maxWidth: { xs: 300, sm: 320, md: 400 },
          bgcolor: 'common.white',
          borderRadius: 0.5,
          boxShadow: 4,
          px: 1.5,
          py: 1,
        }}
      >
        <Stack p={{ xs: 2, sm: 3 }} spacing={2}>
          <Box display="flex" alignItems="center">
            <Avatar
              alt=""
              src={`${ONBOARDING_GRID_IMAGES}/chris.png`}
              sx={{
                width: { xs: 48, sm: 60 },
                height: { xs: 48, sm: 60 },
                bgcolor: ONBOARDING_BG_COLOR,
              }}
            />
            <Box pl={2}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontSize={{ xs: 12, sm: 14 }}
              >
                Father
              </Typography>
              <Typography
                fontWeight={900}
                color="text.primary"
                fontSize={{ xs: 16, sm: 18 }}
              >
                Joe Collins
              </Typography>
            </Box>
          </Box>

          <Typography fontSize={{ xs: 14, sm: 16, md: 18 }} fontWeight={400}>
            Hey John, let’s talk about how you’ve been lately.
          </Typography>

          <SizedButton
            variant="text"
            fullWidth
            sx={{
              bgcolor: theme.palette.secondary.light,
              py: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={700}
              color="common.black"
              fontSize={{ xs: 14, sm: 16 }}
            >
              Start Chat
            </Typography>
          </SizedButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default OnboardingHealing;
