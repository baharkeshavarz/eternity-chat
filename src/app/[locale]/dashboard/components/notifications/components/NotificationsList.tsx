import { Box, Typography, List, ListItem, Badge } from '@mui/material';
import { useLocale } from 'next-intl';
import { LAYOUT_BACKGROUND_BLUE, STEPPER_COLOR } from '@/constants/general';
import { useNotifications } from '../hooks/useNotifications';
import RoundedIcon from '@/components/common/RoundedIcon';
import Image from 'next/image';
import { useAppContext } from '@/hooks/useAppContext';

const NotificationsList = () => {
  const notifications = useNotifications();
  const locale = useLocale();
  const { isMobile } = useAppContext();

  return (
    <List disablePadding>
      {notifications.map((notif, index) => (
        <Box
          key={index}
          sx={{
            bgcolor: notif.unread ? LAYOUT_BACKGROUND_BLUE : 'transparent',
            mb: 1,
            py: { xs: 2, sm: 2.5 },
            px: { xs: 1.5, sm: 2 },
          }}
        >
          <ListItem disableGutters>
            <Box
              display="flex"
              width="100%"
              flexDirection={isMobile ? 'column' : 'row'}
              alignItems={isMobile ? 'flex-start' : 'center'}
              justifyContent="space-between"
              gap={isMobile ? 1.5 : 0}
            >
              <Box display="flex" alignItems="center" gap={2} width="100%">
                <RoundedIcon
                  width={35}
                  height={35}
                  sxProp={{
                    backgroundColor: notif.unread ? 'white' : '#E6E7E9',
                    minWidth: 35,
                    minHeight: 35,
                  }}
                  icon={
                    <Image
                      alt={notif.title}
                      width={21}
                      height={21}
                      src={notif.icon}
                    />
                  }
                />
                <Typography
                  variant="body2"
                  fontWeight={notif.unread ? 600 : 400}
                  className={`latoStyleRegular-${locale}`}
                  sx={{
                    wordBreak: 'break-word',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  }}
                >
                  {notif.title}
                </Typography>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                flexShrink={0}
                sx={{
                  mt: { xs: 1, sm: 0 },
                }}
              >
                <Typography
                  variant="caption"
                  color={STEPPER_COLOR}
                  className={`latoStyleRegular-${locale}`}
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                >
                  {notif.time}
                </Typography>

                {notif.unread && (
                  <Badge color="secondary" variant="dot" sx={{ ml: 1 }} />
                )}
              </Box>
            </Box>
          </ListItem>
        </Box>
      ))}
    </List>
  );
};

export default NotificationsList;
