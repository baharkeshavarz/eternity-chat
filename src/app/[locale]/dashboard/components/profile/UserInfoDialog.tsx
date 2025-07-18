import { Dialog } from '@/components/Dialog';
import { DialogProps } from '@/components/Dialog/Dialog';
import { DIALOG_SIDEBAR_WIDTH } from '@/constants/general';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import UserEditSidebar from './components/UserEditSidebar';
import { useEditInfoMenus } from './hooks/useSettingMenus';

export type UserInfoDialogProps = DialogProps;

const UserInfoDialog: FC<UserInfoDialogProps> = ({ ...props }) => {
  const t = useTranslations();
  const [selectedSection, setSelectedSection] = useState('General Information');
  const { accountSettingsMenus, standaloneItems } = useEditInfoMenus();

  return (
    <Dialog
      {...props}
      title="Edit Info"
      maxWidth="sm"
      fullWidth
      sx={{ marginX: 'auto' }}
      dialogButtons={[]}
    >
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
        <Box
          sx={{
            width: { xs: '100%', sm: DIALOG_SIDEBAR_WIDTH },
            mr: { sm: 3 },
            mb: { xs: 2, sm: 0 },
          }}
        >
          <UserEditSidebar
            selected={selectedSection}
            onSelect={setSelectedSection}
          />
        </Box>

        <Box sx={{ flex: 1, width: '100%' }}>
          {
            [...accountSettingsMenus, ...standaloneItems].find(
              (menu) => menu.label === selectedSection,
            )?.component
          }
        </Box>
      </Box>
    </Dialog>
  );
};

export default UserInfoDialog;
