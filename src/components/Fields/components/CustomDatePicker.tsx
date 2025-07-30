import { DatePicker } from '@mui/x-date-pickers';
import { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { ICustomDatePicker } from '../types';
import ClearButtonAdornment from './ClearButtonAdornment';
import { Box, Typography } from '@mui/material';

const CustomDatePicker: FC<ICustomDatePicker['props']> = ({
  name,
  label,
  variant = 'outlined',
  labelVariant = 'subtitle1',
  boldLabel = true,
  valueFormatter,
  format = 'yyyy/MM/dd',
  ...props
}) => {
  const { control } = useFormContext();
  const {
    field,
    formState: { errors },
  } = useController({ name, control });

  const handleChange = (date: any) => {
    let value = date;
    if (valueFormatter) {
      value = valueFormatter(value);
    }

    field.onChange(value);
  };

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && (
        <Typography
          variant={labelVariant}
          mb={1}
          fontWeight={boldLabel ? 'bold' : 'normal'}
        >
          {label}
        </Typography>
      )}

      <DatePicker
        format={format}
        {...props}
        value={(field.value as unknown as never) || ''}
        onChange={handleChange}
        onSelectedSectionsChange={() => {}}
        closeOnSelect={true}
        sx={{
          ...props?.sx,
        }}
        slotProps={{
          textField: () => ({
            helperText: errors[name]?.message?.toString(),
            error: !!errors[name],
            fullWidth: true,
            variant,
            size: 'small',
            InputProps: {
              startAdornment: field.value ? (
                <ClearButtonAdornment onChange={field.onChange} />
              ) : undefined,
            },
          }),
        }}
      />
    </Box>
  );
};

export default CustomDatePicker;
