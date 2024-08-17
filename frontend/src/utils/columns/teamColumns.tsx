'use client';

import MembersList from '@/components/MembersList/MembersList';
import { ColumnDef } from '@tanstack/react-table';
import { Check, Ellipsis, Link } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const teamColumns: ColumnDef<TeamWithMembers>[] = [
  {
    accessorKey: 'name',
    header: () => <div className="pl-5">Name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex w-60 items-center gap-2 truncate pl-5">
          <span>{row.getValue('name')}</span>
          {row.original.joined_team && (
            <div className="flex items-center gap-1 rounded-sm border border-border bg-accent p-0.5 px-1 text-xs font-medium text-primary/60 shadow">
              <Check size={16} />
              Joined
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'identifier',
    header: 'Identifier',
    cell: ({ row }) => {
      return <div className="w-60 truncate">{row.getValue('identifier')}</div>;
    },
  },
  {
    accessorKey: 'members',
    header: 'Members',
    cell: ({ row }) => {
      const members: User[] = row.getValue('members');

      return <MembersList members={members} />;
    },
  },
  {
    accessorKey: 'projects',
    header: 'Projects',
    cell: () => {
      return <>-</>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-5 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="flex items-center gap-4 text-sm"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.location.href}/${row.getValue('identifier')}`,
                )
              }
            >
              <Link size={16} />
              Copy link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
