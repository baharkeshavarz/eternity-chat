'use client';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

import { DEFAULT_DASHBOARD_ICONS } from '@/constants/general';
import UserInfoDialog from './profile/UserInfoDialog';

const AppBarComponent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEditProfile = () => {
    setOpenDialog(!openDialog);
    handleMenuClose();
  };

  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box display="flex" alignItems="center">
        <Avatar
          alt="John Doe"
          src={`${DEFAULT_DASHBOARD_ICONS}/john-doe-avatar.png`}
          sx={{ marginRight: 1 }}
        />
        <Typography variant="subtitle1" fontWeight="bold">
          John Doe
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <IconButton aria-label="Call">
          <Image
            alt="Call icon"
            src={`${DEFAULT_DASHBOARD_ICONS}/phone.png`}
            width={24}
            height={24}
          />
        </IconButton>

        <IconButton aria-label="Search">
          <SearchIcon sx={{ color: 'text.primary' }} />
        </IconButton>

        {/* MoreVertIcon with Dropdown Menu */}
        <IconButton
          aria-label="More options"
          aria-controls={open ? 'menu-options' : undefined}
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <MoreVertIcon sx={{ color: 'text.primary' }} />
        </IconButton>

        <Menu
          id="menu-options"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              minWidth: 250,
              py: 1.2,
              borderRadius: 0.5,
            },
          }}
        >
          <MenuItem onClick={handleOpenEditProfile} sx={{ py: 1.5 }}>
            <Image
              alt="Edit"
              src={`${DEFAULT_DASHBOARD_ICONS}/pen.png`}
              width={17}
              height={17}
            />
            <Typography variant="subtitle1" fontWeight={700} ml={1}>
              Edit Info
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            sx={{ fontSize: '1rem', py: 1.5 }}
          >
            <Image
              alt="Chat"
              src={`${DEFAULT_DASHBOARD_ICONS}/chat.png`}
              width={17}
              height={17}
            />
            <Typography variant="subtitle1" fontWeight={700} ml={1}>
              End Chat
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            sx={{ fontSize: '1rem', py: 1.5 }}
          >
            <Image
              alt="Trash"
              src={`${DEFAULT_DASHBOARD_ICONS}/trash.png`}
              width={17}
              height={17}
            />
            <Typography
              variant="subtitle1"
              fontWeight={700}
              ml={1}
              color="error.main"
            >
              Delete Chat
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
      <UserInfoDialog open={openDialog} onClose={handleOpenEditProfile} />
    </Toolbar>
  );
};

export default AppBarComponent;
