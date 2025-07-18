import CustomSkeleton from '@/components/common/CustomSkeleton';
import { Avatar, Typography, Stack } from '@mui/material';
import { FC } from 'react';

interface UserDetailsProps {
  collapsed: boolean;
}

const UserDetails: FC<UserDetailsProps> = ({ collapsed }) => {
  const avatarSize = collapsed ? 35 : 70;
  const profileData = {
    fullName: 'Linda Peterson',
    avatar: '/assets/images/users/linda.jpg',
    email: 'bahar.keshavarzc@gmail.com',
  };
  const isFetching = false;

  return (
    <Stack
      p={3}
      spacing={1}
      display="flex"
      alignItems={collapsed ? 'center' : 'flex-start'}
    >
      <Avatar
        alt=""
        src={profileData?.avatar}
        sx={{ width: avatarSize, height: avatarSize }}
        slotProps={{
          img: {
            width: avatarSize,
            height: avatarSize,
          },
        }}
      />
      <CustomSkeleton isLoading={isFetching}>
        <Typography variant={collapsed ? 'caption' : 'body2'} fontWeight={700}>
          {profileData?.fullName}
        </Typography>
      </CustomSkeleton>
    </Stack>
  );
};

export default UserDetails;
