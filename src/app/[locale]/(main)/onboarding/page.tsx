'use client';

import { alpha, Box, Grid } from '@mui/material';
import OnboardingDescription from './components/OnboardingDescription';
import { useOnboardingSteps } from './hooks/useOnboardingSteps';
import { useState } from 'react';

const OnboardingSlider = () => {
  const steps = useOnboardingSteps();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box
      display="flex"
      width="100%"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Grid
        container
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="center"
        width="100%"
        mx="auto"
      >
        {/* Left Side */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <OnboardingDescription
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </Grid>

        {/* Right Side */}
        <Grid
          size={{ xs: 12, sm: 6 }}
          sx={(theme) => ({
            backgroundImage: `linear-gradient(
                              to top left,
                              ${alpha('#EEBF95', 0.2)},
                              ${theme.palette.background.default}
                            )`,
          })}
        >
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            {steps[activeStep].component}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OnboardingSlider;
