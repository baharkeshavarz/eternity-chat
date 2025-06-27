import { FIXED_BUTTON_HEIGHT } from '@/constants/general';
import { Button } from '@mui/material';

const SizedButton = ({ ...props }) => {
  return (
    <Button
      {...props}
      sx={{ fontSize: '1rem', height: FIXED_BUTTON_HEIGHT, ...props.sx }}
    >
      {props.children}
    </Button>
  );
};

export default SizedButton;
