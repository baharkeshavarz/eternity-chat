import {
  DEFAULT_MAX_WIDTH_369,
  DEFAULT_DASHBOARD_ICONS,
} from '@/constants/general';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { FC, ReactNode } from 'react';

type ModalInformationProps = {
  icon: string;
  title: string;
  children?: ReactNode;
};

const ModalInformation: FC<ModalInformationProps> = ({
  icon,
  title,
  children,
}) => {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Image
        alt=""
        src={`${DEFAULT_DASHBOARD_ICONS}/${icon}`}
        width={42}
        height={42}
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        maxWidth={DEFAULT_MAX_WIDTH_369}
        width={{ xs: '90%', sm: DEFAULT_MAX_WIDTH_369 }}
        gap={1}
        mb={4}
      >
        <Typography
          variant="h2"
          fontWeight={700}
          mt={4}
          mb={1}
          textAlign="center"
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default ModalInformation;
