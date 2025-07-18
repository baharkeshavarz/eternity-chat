import GeneralInformation from '../components/GeneralInformation';
import PersonalityTraits from '../components/PersonalityTraits';
import Appearance from '../components/Appearance';
import CommunicationStyle from '../components/CommunicationStyle';
import Memories from '../components/Memories';

export const useEditInfoMenus = () => {
  // Submenu items under "Account Settings"
  const accountSettingsMenus = [
    {
      label: 'General Information',
      component: <GeneralInformation />,
    },
    {
      label: 'Personality Traits',
      component: <PersonalityTraits />,
    },

    {
      label: 'Appearance',
      component: <Appearance />,
    },
    {
      label: 'Communication Style',
      component: <CommunicationStyle />,
    },
    {
      label: 'Memories',
      component: <Memories />,
    },
  ];

  const standaloneItems = [
    {
      label: 'Speech',
      component: <div>Speech Editor</div>,
    },
    {
      label: 'Activity',
      component: <div>Activity Editor</div>,
    },
  ];

  return {
    accountSettingsMenus,
    standaloneItems,
  };
};
