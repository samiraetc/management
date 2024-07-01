import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';

export const dropdownNavigation = [
  {
    type: 'link',
    name: 'My Account',
    url: '/my-acocunt',
    separator: true,
  },
  {
    type: 'button',
    name: 'Workspace Settings',
    url: 'workspace/item',
  },
  {
    type: 'list',
    name: 'Switch workspaces',
    url: null,
    children: [
      {
        type: 'link',
        name: 'Create or join a workspace',
        url: '/join',
        separator: false,
      },
      {
        type: 'button',
        name: ''
      }
    ],
  },
  {
    type: 'button',
    name: 'Log out',
    action: signOut,
    icon: LogOutIcon,
  },
];
