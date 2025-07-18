import { Dialog } from '@/components/Dialog';
import { DialogProps } from '@/components/Dialog/Dialog';
import TabPanel from '@/components/TabPanel/TabPanel';
import {
  DIALOG_SIDEBAR_WIDTH,
  LAYOUT_BACKGROUND_BLUE,
} from '@/constants/general';
import { Box, Skeleton, Tab, Tabs } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, Suspense, SyntheticEvent, useState } from 'react';
import { useSettingMenus } from './hooks/useSettingMenus';
import { useAppContext } from '@/hooks/useAppContext';

export type SettingDialogProps = DialogProps;
export const generalDialogMenuSettings = {
  '& .MuiTab-root': {
    textTransform: 'none',
    alignItems: 'flex-start',
    padding: 1,
    borderRadius: 0.5,
    marginBottom: { xs: 0, sm: 1 },
    color: 'grey.600',
    border: 'none',
    '&.Mui-selected': {
      backgroundColor: LAYOUT_BACKGROUND_BLUE,
      fontWeight: 700,
      color: 'black',
    },
  },
};

const SettingDialog: FC<SettingDialogProps> = ({ ...props }) => {
  const t = useTranslations();
  const { isMobile } = useAppContext();
  const menus = useSettingMenus();

  const [value, setValue] = useState(0);
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: number,
  ) => {
    setValue(newValue);
  };

  return (
    <Dialog
      {...props}
      title={t('common.buttons.setting')}
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
          <Tabs
            value={value}
            onChange={handleChange}
            orientation={isMobile ? 'horizontal' : 'vertical'}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="settings tabs"
            sx={{
              ...generalDialogMenuSettings,
            }}
          >
            {menus.map((menu, index) => (
              <Tab label={menu.label} key={index} />
            ))}
          </Tabs>
        </Box>

        {/* Content Area */}
        <Box sx={{ flex: 1, width: '100%' }}>
          {menus.map((menu, index) => (
            <TabPanel key={index} value={value} index={index}>
              <Suspense fallback={<Skeleton height={300} />}>
                {menu.component}
              </Suspense>
            </TabPanel>
          ))}
        </Box>
      </Box>
    </Dialog>
  );
};

export default SettingDialog;
