import { DEFAULT_DASHBOARD_ICONS } from '@/constants/general';

export const useNotifications = () => {
  const notifications = [
    {
      icon: `${DEFAULT_DASHBOARD_ICONS}/star-shiny-blue.png`,
      title: 'New voice/video update available for John’s persona.',
      time: '2 min ago',
      unread: true,
    },
    {
      icon: `${DEFAULT_DASHBOARD_ICONS}/money.png`,
      title: 'Your subscription has been successfully renewed.',
      time: '30 min ago',
      unread: false,
    },
    {
      icon: `${DEFAULT_DASHBOARD_ICONS}/eye.png`,
      title: 'Your 7-day free trial will end in 2 days.',
      time: '1 min ago',
      unread: false,
    },
    {
      icon: `${DEFAULT_DASHBOARD_ICONS}/star-shiny.png`,
      title: 'Your AI replica is ready.',
      time: '2 days ago',
      unread: false,
    },
  ];
  return notifications;
};
