import { LAYOUT_BACKGROUND_BLUE } from '@/constants/general';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useEditInfoMenus } from '../hooks/useSettingMenus';

const UserEditSidebar = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (section: string) => void;
}) => {
  const [open, setOpen] = useState(true);
  const { accountSettingsMenus, standaloneItems } = useEditInfoMenus();
  const submenuItems = accountSettingsMenus.map((item) => item.label);
  const standaloneItemLabels = standaloneItems.map((item) => item.label);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <List component="nav">
        {/* Parent Item: Account Settings */}
        <ListItemButton onClick={handleClick}>
          <ListItemText
            primary="Account Settings"
            slotProps={{
              primary: {
                variant: 'subtitle2',
                fontWeight: submenuItems.includes(selected) ? 'bold' : 'normal',
              },
            }}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          {submenuItems.map((item) => (
            <ListItemButton
              key={item}
              selected={selected === item}
              onClick={() => onSelect(item)}
              sx={{
                pl: 4,
                borderRadius: '8px',
                '&.Mui-selected': {
                  backgroundColor: LAYOUT_BACKGROUND_BLUE,
                  fontWeight: 'bold',
                },
              }}
            >
              <ListItemText
                primary={item}
                slotProps={{
                  primary: {
                    variant: 'subtitle2',
                    fontWeight: selected === item ? 'bold' : 'normal',
                  },
                }}
              />
            </ListItemButton>
          ))}
        </Collapse>

        {/* Standalone Items */}
        {standaloneItemLabels.map((item) => (
          <ListItemButton
            key={item}
            selected={selected === item}
            onClick={() => onSelect(item)}
            sx={{
              borderRadius: '8px',
              mb: 1,
              '&.Mui-selected': {
                backgroundColor: LAYOUT_BACKGROUND_BLUE,
                fontWeight: 'bold',
              },
            }}
          >
            <ListItemText
              primary={item}
              slotProps={{
                primary: {
                  variant: 'subtitle2',
                  fontWeight: selected === item ? 'bold' : 'normal',
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

export default UserEditSidebar;
