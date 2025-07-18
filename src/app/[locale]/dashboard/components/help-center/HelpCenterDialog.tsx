import { Box, Tab, Tabs } from '@mui/material';
import { Dialog } from '@/components/Dialog';
import { DialogProps } from '@/components/Dialog/Dialog';
import { useTranslations } from 'next-intl';
import { FC, SyntheticEvent, useState } from 'react';
import TabPanel from '@/components/TabPanel/TabPanel';
import { useHelpCenterMenus } from './hooks/useHelpCenterMenus';
import { DIALOG_SIDEBAR_WIDTH } from '@/constants/general';
import { useAppContext } from '@/hooks/useAppContext';
import { generalDialogMenuSettings } from '../setting/SettingDialog';

export type HelpCenterDialogProps = DialogProps;

const HelpCenterDialog: FC<HelpCenterDialogProps> = ({ ...props }) => {
  const t = useTranslations();
  const { isMobile } = useAppContext();
  const menus = useHelpCenterMenus();

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
      title={t('common.buttons.helpCenter')}
      maxWidth="sm"
      fullWidth
      sx={{ marginX: 'auto' }}
      dialogButtons={[]}
    >
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
        <Box sx={{ width: DIALOG_SIDEBAR_WIDTH, mr: 1 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="help center tabs"
            orientation={isMobile ? 'horizontal' : 'vertical'}
            sx={{
              ...generalDialogMenuSettings,
            }}
          >
            {menus.map((menu, index) => (
              <Tab label={menu.label} key={index} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ flex: 1 }}>
          {menus.map((menu, index) =>
            menu.component ? (
              <TabPanel key={index} value={value} index={index}>
                {menu.component}
              </TabPanel>
            ) : null,
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default HelpCenterDialog;
