import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container, IconButton, Toolbar } from '@mui/material';
import { FC } from 'react';
import AppBarComponent from './AppBarComponent';

interface TopBarProps {
  toggleCollapsed: VoidFunction;
  collapsed: boolean;
}

const TopBar: FC<TopBarProps> = ({ collapsed, toggleCollapsed }) => {
  const iconBackColorOpen = 'grey.200';
  const iconBackColor = 'grey.100';

  return (
    <>
      <Box sx={{ bgcolor: (theme) => theme.palette.background.paper }}>
        <Box display="flex" alignItems="center">
          <Toolbar>
            <IconButton
              onClick={toggleCollapsed}
              edge="start"
              color="secondary"
              sx={{
                color: 'text.primary',
                borderRadius: 0.2,
                bgcolor: collapsed ? iconBackColorOpen : iconBackColor,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Container maxWidth="md" sx={{ flex: 1 }}>
            <AppBarComponent />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default TopBar;
