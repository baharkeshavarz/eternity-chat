import useGenderList from '@/app/[locale]/(main)/hooks/useGenderList';
import useGetPersonalities from '@/app/[locale]/(main)/hooks/useGetPersonalities';
import { MINI_DRAWER_WIDTH } from '@/constants/general';
import { GenderEnum } from '@/services/common/types';
import { Avatar, Box, Link, Stack, Tooltip } from '@mui/material';
import AddPersonalityButton from './AddPersonalityButton';
import AvatarSkeleton from './AvatarSkeleton';
import UploadDocumentButton from './UploadDocumentButton';
import { IPersonality } from '@/services/personality/types';
import { DEFAULT_DASHBOARD_CHAT_PATH } from '@/constants/routes';

const ChatDrawer = () => {
  const { data, isFetching } = useGetPersonalities();
  const genderMapper = useGenderList();

  // Extract personalities from API response
  const personalities = data?.personalities?.[0]?.details || {};
  const users = (Object.values(personalities) as IPersonality[]).map(
    (personality) => {
      return {
        title: personality.name,
        icon: genderMapper[personality.gender || GenderEnum.Male].icon,
      };
    },
  );

  return (
    <>
      <Box
        width={MINI_DRAWER_WIDTH}
        p={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
        sx={{
          bgcolor: (theme) => theme.palette.background.paper,
        }}
      >
        <Stack spacing={3}>
          {isFetching ? (
            <AvatarSkeleton count={3} />
          ) : (
            <>
              {users?.map((user, index) => (
                <Tooltip key={index} title={user.title || ''} arrow>
                  <Link href={`${DEFAULT_DASHBOARD_CHAT_PATH}/${user.title}`}>
                    <Avatar
                      alt={user.title}
                      src={(user.icon as string) || ''}
                      sx={{
                        width: { xs: 45, md: 60 },
                        height: { xs: 45, md: 60 },
                      }}
                    />
                  </Link>
                </Tooltip>
              ))}
            </>
          )}
        </Stack>

        <Stack spacing={1}>
          <AddPersonalityButton />
          <UploadDocumentButton />
        </Stack>
      </Box>
    </>
  );
};

export default ChatDrawer;
