import { CustomSelect, Option } from '@/components/Fields';
import { DEFAULT_DASHBOARD_ICONS } from '@/constants/general';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

const durationOptions: Option[] = [
  { label: 'This Week', id: 1, value: '7' },
  { label: 'This Month', id: 2, value: '30' },
  { label: 'This Year', id: 3, value: '365' },
];

const NotificationsFilter = () => {
  const filterOptions = durationOptions.map((duration) => ({
    label: duration.label,
    id: duration.id,
    value: duration.value,
  }));

  const methods = useForm<any>({
    resolver: yupResolver(yup.object({})),
    defaultValues: {
      durationTime: filterOptions[0]?.value || '',
    },
  });

  return (
    <FormProvider {...methods}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 3.5, py: 2 }}
      >
        <Typography variant="h6" fontWeight="bold">
          Result (37)
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <CustomSelect
            name="durationTime"
            options={filterOptions}
            showEndAdornment={false}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          />
          <Image
            alt=""
            src={`${DEFAULT_DASHBOARD_ICONS}/settings.png`}
            width={24}
            height={24}
          />
        </Box>
      </Box>
    </FormProvider>
  );
};

export default NotificationsFilter;
