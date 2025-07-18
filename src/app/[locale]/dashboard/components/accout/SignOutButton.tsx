import { useTranslations } from 'next-intl';
import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import { Logout } from '@mui/icons-material';
import { useState } from 'react';
import DeleteChatDialog from '../../chat/[userId]/components/dialogs/DeleteChatDialog';
import EndConversationDialog from '../../chat/[userId]/components/dialogs/EndConversationDialog';
import FeedbackDialog from '../../chat/[userId]/components/dialogs/FeedbackDialog';
import LogoutDialog from './LogoutDialog';
import FeedbackThanksDialog from '../../chat/[userId]/components/dialogs/FeedbackThanksDialog';

const SignOutButton = () => {
  const t = useTranslations();
  const [logoutDialog, setLogoutDialog] = useState(false);

  const onToggleLogoutDialog = () => {
    setLogoutDialog((prevState) => !prevState);
  };
  return (
    <>
      <ButtonWithLoading
        onClick={onToggleLogoutDialog}
        variant="text"
        color="error"
        fullWidth
        startIcon={<Logout />}
      >
        {t('common.buttons.logout')}
      </ButtonWithLoading>
      <LogoutDialog open={logoutDialog} onClose={onToggleLogoutDialog} />
      {/* <DeleteChatDialog open={logoutDialog} onClose={onToggleLogoutDialog} /> */}
      {/* <EndConversationDialog
        open={logoutDialog}
        onClose={onToggleLogoutDialog}
      /> */}
      {/* <FeedbackDialog open={logoutDialog} onClose={onToggleLogoutDialog} /> */}
      {/* <FeedbackThanksDialog
        open={logoutDialog}
        onClose={onToggleLogoutDialog}
      /> */}
    </>
  );
};

export default SignOutButton;
