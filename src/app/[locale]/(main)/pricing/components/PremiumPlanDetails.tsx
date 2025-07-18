'use client';

import { DEFAULT_MAX_WIDTH_469, GREY_3D_COLOR } from '@/constants/general';
import { DEFAULT_PRICING_PATH } from '@/constants/routes';
import { useAppContext } from '@/hooks/useAppContext';
import { ArrowBack } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

const PremiumPlanDetails = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { isMobile } = useAppContext();

  const featureKeys = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'];
  const typoClass = `latoStyleRegular-${locale}`;

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        px={{ xs: 2, sm: 8, md: 16 }}
        minHeight={isMobile ? '0' : '100%'}
        width="100%"
      >
        <Box pt={8} width="100%">
          <Link href={DEFAULT_PRICING_PATH}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <ArrowBack fontSize="medium" />
              <Typography variant="h5" sx={{ color: GREY_3D_COLOR }}>
                {t('common.buttons.back')}
              </Typography>
            </Box>
          </Link>
        </Box>

        <Stack maxWidth={DEFAULT_MAX_WIDTH_469}>
          <Typography
            variant="h1"
            fontWeight="bold"
            pt={4}
            fontSize={isMobile ? '30px' : '40px'}
          >
            {t('pages.paymentPlans.premiumUpgrade.title')}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={400}
            mt={2}
            className={typoClass}
          >
            {t('pages.paymentPlans.premiumUpgrade.planDetailTitle')}
          </Typography>

          <Box pt={4}>
            <Typography variant="body2" className={typoClass}>
              {t('pages.paymentPlans.premiumUpgrade.planDetails')}
            </Typography>

            <List>
              {featureKeys.map((key) => (
                <ListItem
                  key={key}
                  disableGutters
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 16 }}>
                    <FiberManualRecordIcon
                      sx={{
                        color: 'black',
                        fontSize: 8,
                        flexShrink: 0,
                        mt: '14px', // aligns the icon vertically with the text
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        lineHeight={1.5}
                        m={0}
                        className={typoClass}
                        color={GREY_3D_COLOR}
                        fontSize={isMobile ? '18px' : '20px'}
                      >
                        {t(`pages.paymentPlans.premiumUpgrade.features.${key}`)}
                      </Typography>
                    }
                    slotProps={{
                      primary: {
                        variant: 'body2',
                        fontWeight: 400,
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box maxWidth={DEFAULT_MAX_WIDTH_469} py={2}>
            <Typography variant="h4" fontWeight="bold" pt={3}>
              {t('pages.paymentPlans.premiumUpgrade.helpTitle')}
            </Typography>
            <Typography
              variant="body2"
              pt={1}
              className={typoClass}
              fontSize={isMobile ? '18px' : '20px'}
            >
              {t.rich('pages.paymentPlans.premiumUpgrade.helpDescription', {
                support: (chunks) => (
                  <Link href="/support" style={{ color: blue[400] }}>
                    {chunks}
                  </Link>
                ),
                faq: (chunks) => (
                  <Link href="/faq" style={{ color: blue[400] }}>
                    {chunks}
                  </Link>
                ),
              })}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default PremiumPlanDetails;
