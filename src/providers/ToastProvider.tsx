'use client';

import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = () => {
  return (
    <Box
      sx={{
        '& .Toastify__toast': {
          '--toastify-font-family': (theme) =>
            `${theme.typography.fontFamily} !important`,
        },
      }}
    >
      <ToastContainer position="top-center" />
    </Box>
  );
};

export default ToastProvider;
