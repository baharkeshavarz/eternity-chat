'use client';

import {
  FormControl,
  FormHelperText,
  Select,
  SelectChangeEvent,
  Typography,
  MenuItem,
  Box,
} from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CustomSkeleton from '../../common/CustomSkeleton';
import useLocalFormContext from '../hooks/useLocalFormContext';
import { CustomSelectProps } from '../types';
import ClearButtonAdornment from './ClearButtonAdornment';
import { FIXED_SELECT_HEIGHT } from '@/constants/general';

const CustomSelect: FC<CustomSelectProps> = ({
  options = [],
  name = '',
  size = 'small',
  label,
  labelFormatter,
  resetFieldsOnChange = [],
  showEndAdornment = true,
  showOptionRight = false,
  ...props
}) => {
  const { isLoading } = useLocalFormContext();
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        let normalizedValue: number | number[] | '' = '';
        if (Array.isArray(field.value)) {
          normalizedValue = field?.value?.map((item) =>
            typeof item === 'object' ? item.id : item,
          );
        } else if (typeof field.value === 'object' && field.value?.id) {
          normalizedValue = field.value.id;
        } else if (typeof field.value === 'number') {
          normalizedValue = field.value;
        } else {
          normalizedValue = field.value ?? '';
        }

        const handleChange = (event: SelectChangeEvent<any>) => {
          props?.onChange?.(event as any);
          field.onChange(event);

          resetFieldsOnChange.forEach((key) => {
            setValue(key, null);
          });
        };

        return (
          <CustomSkeleton isLoading={isLoading}>
            <FormControl fullWidth error={!!errors[name]} size={size}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                {label && (
                  <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                    {label}
                  </Typography>
                )}
                <Select
                  {...props}
                  IconComponent={props.IconComponent}
                  sx={{
                    height: FIXED_SELECT_HEIGHT,
                    // ...sharedDropdownFieldProps,
                    ...props?.sx,
                  }}
                  id={`${name}-select`}
                  value={normalizedValue}
                  onChange={handleChange}
                  startAdornment={
                    normalizedValue && showEndAdornment ? (
                      <ClearButtonAdornment onChange={field.onChange} />
                    ) : undefined
                  }
                >
                  {options?.map((option) => (
                    <MenuItem
                      key={option.id}
                      value={option.value as string}
                      sx={
                        showOptionRight
                          ? {
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }
                          : undefined
                      }
                    >
                      {labelFormatter ? labelFormatter(option) : option.label}
                    </MenuItem>
                  ))}
                </Select>

                {/* <div>sx:{JSON.stringify(props.sx)}</div> */}
                {/* <div>{props?.sx}</div> */}
                {errors[name]?.message && (
                  <FormHelperText>
                    {errors[name]?.message?.toString()}
                  </FormHelperText>
                )}
              </Box>
            </FormControl>
          </CustomSkeleton>
        );
      }}
    />
  );
};

export default CustomSelect;
