'use client';

import { Rating, Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

type StarRatingProps = {
  name: string;
  label?: string;
};

const StarRating: FC<StarRatingProps> = ({ name, label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      width="100%"
      mt={2}
    >
      {label && (
        <Typography variant="subtitle1" fontWeight={600}>
          {label}
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={0}
        render={({ field }) => (
          <Rating
            {...field}
            value={field.value || 0}
            onChange={(_, value) => field.onChange(value)}
            sx={{
              color: 'primary.main',
              '& .MuiRating-icon': {
                fontSize: '34px',
              },
            }}
          />
        )}
      />

      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default StarRating;
