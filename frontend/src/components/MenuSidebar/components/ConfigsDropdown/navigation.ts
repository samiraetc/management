import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';

export const dropdownNavigation = [
  {
    type: 'link',
    name: 'My Account',
    url: '/my-account',
    separator: true,
  },
  {
    type: 'link',
    name: 'Workspace Settings',
    url: '/meu-novo-workspace/settings/general',
  },
  {
    type: 'list',
    name: 'Switch Workspace',
    url: null,
    children: [
      {
        type: 'link',
        name: 'Create or join a workspace',
        url: '/join',
        separator: false,
      },
    ],
  },
  {
    type: 'button',
    name: 'logout',
    action: signOut,
    icon: LogOutIcon,
  },
];

export const settingsWorkspaceNavigation = [
  {
    name: 'General',
    url: '/general'
  },
  {
    name: 'Labels',
    url: '/labels'
  }
]
