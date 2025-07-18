import { Box, TextField, Typography } from '@mui/material';
import { AnimationEvent, FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CustomSkeleton from '../../common/CustomSkeleton';
import { DEFAULT_FORBIDDEN_CHARS } from '../constants/defaults';
import useLocalFormContext from '../hooks/useLocalFormContext';
import { CustomTextFieldProps } from '../types';
import ClearButtonAdornment from './ClearButtonAdornment';
import { FIXED_INPUT_HEIGHT } from '@/constants/general';

const CustomTextField: FC<CustomTextFieldProps> = ({
  fullWidth = true,
  size = 'small',
  ControllerProps = {},
  forbiddenChars = DEFAULT_FORBIDDEN_CHARS,
  label,
  boldLabel = false,
  labelVariant = 'subtitle1',
  ...props
}) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const { isLoading } = useLocalFormContext();

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (['+', '-'].includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <Controller
      name={props.name}
      control={control}
      {...ControllerProps}
      render={({ field: { value, onChange } }) => {
        const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          let isValid = true;
          const type = props.type?.toLowerCase();
          if (type === 'number') {
            let _value = +event.target.value;
            isValid =
              _value >= (props.limitations?.min || -Infinity) &&
              _value <= (props.limitations?.max || Infinity) &&
              !forbiddenChars?.includes(_value.toString());

            if (isValid) {
              _value = +_value;
            }
          } else if (['password', 'text', 'string', undefined].includes(type)) {
            const _value = event.target.value;
            isValid =
              _value.length <= (props.limitations?.maxLength || Infinity) &&
              _value.length >= (props.limitations?.minLength || -Infinity);
          }

          if (isValid) {
            onChange(event);
          }
        };

        return (
          <CustomSkeleton isLoading={isLoading}>
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

              <TextField
                {...props}
                fullWidth={fullWidth}
                size={size}
                onKeyDown={
                  props.type?.toLowerCase() === 'number' ? onKeyDown : undefined
                }
                value={value ?? ''}
                onChange={_onChange}
                error={!!errors[props.name]}
                helperText={errors[props.name]?.message?.toString()}
                slotProps={{
                  input: {
                    ...(props.multiline
                      ? {}
                      : { sx: { height: FIXED_INPUT_HEIGHT } }),

                    endAdornment: (
                      <>
                        {!props.disabled && value && (
                          <ClearButtonAdornment onChange={onChange} />
                        )}
                        {props?.slotProps &&
                          props?.slotProps?.input?.endAdornment}
                      </>
                    ),
                    startAdornment: (
                      <>
                        {props?.slotProps &&
                          props?.slotProps?.input?.startAdornment}
                      </>
                    ),
                  },
                  htmlInput: {
                    ...props.slotProps?.htmlInput,
                    onAnimationStart: (e: AnimationEvent) => {
                      if (e.animationName === 'mui-auto-fill') {
                        setValue(props.name, value || ' ');
                      }
                    },
                  },
                  formHelperText: {
                    sx: {
                      m: 0,
                      mt: 1,
                    },
                  },
                }}
              />
            </Box>
          </CustomSkeleton>
        );
      }}
    />
  );
};

export default CustomTextField;
