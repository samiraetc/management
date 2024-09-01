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
    url: 'settings/general',
    workspaceUrl: true,
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
    name: 'Logout',
    action: signOut,
    icon: LogOutIcon,
  },
];

export const settingsWorkspaceNavigation = [
  {
    name: 'General',
    url: 'general',
  },
  {
    name: 'Labels',
    url: 'labels',
  },
];

export const settingsTeamsNavigation = [
  {
    name: 'General',
    url: 'general',
  },
  {
    name: 'Labels',
    url: 'labels',
  },
  {
    name: 'Members',
    url: 'members',
  },
];
