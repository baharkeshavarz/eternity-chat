import { DEFAULT_DASHBOARD_ICONS } from '@/constants/general';
import { green } from '@mui/material/colors';
import Image from 'next/image';

export const sharedTextFieldProps = {
  slotProps: {
    input: {
      startAdornment: (
        <Image
          alt=""
          src={`${DEFAULT_DASHBOARD_ICONS}/pen.png`}
          width={17}
          height={17}
        />
      ),
    },
  },
  sx: {
    direction: 'rtl',
    '& .MuiInputBase-root::before': {
      borderBottom: '0 !important',
    },
  },
};

export const sharedDropdownFieldProps = {
  '&.MuiOutlinedInput-root': {
    backgroundColor: 'blue',
    '&.Mui-focused': {
      backgroundColor: 'blue',
    },
  },
};

export const showOptionRightWithNoBorderSelectSx = {
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  textAlign: 'right',
  '& .MuiSelect-select': {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

export const sharedDatePickerFieldProps = {
  textAlign: 'right',
  '& .MuiPickersOutlinedInput-root .MuiPickersOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiPickersInputBase-root .MuiPickersOutlinedInput-notchedOutline': {
    direction: 'rtl', // Align the text inside the input to the right
    backgroundColor: green,
  },
};
