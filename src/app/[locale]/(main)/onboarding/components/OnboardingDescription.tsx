import {
  DEFAULT_MAX_WIDTH_469,
  DEFAULT_MAX_WIDTH_591,
  STEPPER_COLOR,
} from '@/constants/general';
import { DEFAULT_SIGNIN_PATH } from '@/constants/routes';
import { useAppContext } from '@/hooks/useAppContext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Dispatch, FC, SetStateAction } from 'react';
import { useOnboardingSteps } from '../hooks/useOnboardingSteps';

type OnboardingDescriptionProps = {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
};

const OnboardingDescription: FC<OnboardingDescriptionProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const { isMobile } = useAppContext();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const steps = useOnboardingSteps();
  const locale = useLocale();

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      router.push(DEFAULT_SIGNIN_PATH);
    }
  };

  const handleSkip = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleDotClick = (index: number) => {
    setActiveStep(index);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      justifyContent="space-between"
      alignItems={{ xs: 'center', md: 'flex-start' }}
      px={isMobile ? 4 : isTablet ? 12 : 16}
    >
      <Box my={{ xs: 8, sm: 8, md: 12 }}>
        {/* Dots */}
        <Box mb={2} display="flex" gap={1}>
          {steps?.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: index === activeStep ? 'primary.main' : 'grey.400',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: index === activeStep ? 'scale(1.4)' : 'scale(1)',
              }}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </Box>

        {/* Title and Description */}
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          justifyContent="space-between"
          alignItems={{ xs: 'center', md: 'flex-start' }}
          textAlign={{ xs: 'center', md: 'left' }}
        >
          <Box mt={isMobile ? 6 : isTablet ? 12 : 16}>
            <Box maxWidth={DEFAULT_MAX_WIDTH_591}>
              <Typography
                variant="h1"
                fontWeight="700"
                mb={isMobile ? 4 : 2}
                fontSize={isMobile ? '24px' : '40px'}
              >
                {steps[activeStep].title}
              </Typography>
            </Box>

            <Box maxWidth={DEFAULT_MAX_WIDTH_469}>
              <Typography
                fontSize={18}
                color="text.secondary"
                mb={isMobile ? 0 : 4}
                className={`latoStyleBold-${locale}`}
              >
                {steps[activeStep].description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Bottom Actions */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        width="100%"
        maxWidth={400}
      >
        <Button
          onClick={handleSkip}
          variant="text"
          sx={{
            pointerEvents: activeStep === steps.length - 1 ? 'none' : 'auto',
            cursor: activeStep === steps.length - 1 ? 'not-allowed' : 'pointer',
            opacity: activeStep === steps.length - 1 ? 0.5 : 1,
            color: STEPPER_COLOR,
            minWidth: 0,
            padding: 0,
          }}
        >
          <Typography variant="subtitle1" fontWeight={500}>
            Skip
          </Typography>
        </Button>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{
            cursor: 'pointer',
            '&:hover .hover-text': {
              color: 'common.black',
            },
            '&:hover .hover-button::before': {
              transform: 'translateY(0)',
            },
            '&:hover .hover-button-icon': {
              color: 'common.black',
            },
          }}
        >
          <Button
            variant="contained"
            onClick={handleNext}
            className="hover-button"
            sx={{
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              padding: 0,
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
              '::before': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'secondary.light',
                zIndex: -1,
                transform: 'translateY(100%)',
                transition: 'transform 0.4s ease-in-out',
                borderRadius: '50%',
              },
            }}
          >
            <ArrowForwardIcon className="hover-button-icon" />
          </Button>

          <Typography
            variant="subtitle1"
            fontWeight={700}
            color="primary.main"
            className="hover-text"
            sx={{
              transition: 'color 0.3s ease-in-out',
            }}
          >
            Next
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OnboardingDescription;
