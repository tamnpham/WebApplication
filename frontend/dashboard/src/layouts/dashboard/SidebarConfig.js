import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';

// ----------------------------------------------------------------------
// This file to defint json list components of side bar: user, product, login,...
// Delete if we want to drop 
// ---------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Take a quiz',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Profile',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'History',
    path: '/dashboard/history',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Score Board',
    path: '/dashboard/scoreboard',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Blogs',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  },
];

export default sidebarConfig;
