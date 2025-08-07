import useGenderList from '@/app/[locale]/(main)/hooks/useGenderList';
import useGetPersonalities from '@/app/[locale]/(main)/hooks/useGetPersonalities';
import { MINI_DRAWER_WIDTH } from '@/constants/general';
import { SAMPLE_CHAT_USER_ID } from '@/constants/query-keys';
import { GenderEnum } from '@/services/common/types';
import { Avatar, Box, Stack, Tooltip } from '@mui/material';
import AddPersonalityButton from './AddPersonalityButton';
import AvatarSkeleton from './AvatarSkeleton';
import UploadDocumentButton from './UploadDocumentButton';

const ChatDrawer = () => {
  const { data, isFetching } = useGetPersonalities({
    user_id: SAMPLE_CHAT_USER_ID,
  });
  const genderMapper = useGenderList();

  const users = data?.personalities?.map((personality) => ({
    title: personality.name,
    icon: genderMapper[personality.details.gender || GenderEnum.Male].icon,
  }));

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
                  <Avatar
                    alt={user.title}
                    src={(user.icon as string) || ''}
                    sx={{
                      width: { xs: 45, md: 60 },
                      height: { xs: 45, md: 60 },
                    }}
                  />
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
