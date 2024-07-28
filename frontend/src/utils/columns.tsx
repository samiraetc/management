'use client';

import { getDueDateIcon } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import DataTableCell from '@/components/DataTable/DataTableCell';
import { Checkbox } from '@/components/ui/checkbox';
import LabelList from '@/components/LabelList/LabelList';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import StatusCell from '@/components/StatusCell/StatusCell';
import Priority from '@/components/Priority/Priority';
import Estimative from '@/components/Estimative/Estimative';

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    cell: ({ row }) => (
      <div className="ml-2 sm:ml-0 sm:flex sm:w-8 sm:justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-gray-400 hover:border-2 hover:border-neutral-900 sm:border-transparent"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'priority',
    cell: ({ row }) => {
      return (
        <Priority
          priority={row.getValue('priority')}
          taskId={row.original.id}
        />
      );
    },
  },
  {
    accessorKey: 'identifier',
    cell: ({ row }) => {
      return (
        <div className="hidden w-14 items-center justify-center gap-2 text-stone-600 sm:flex">
          <DataTableCell value={row.getValue('identifier')} />
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    cell: ({ row }) => {
      return (
        <StatusCell status={row.getValue('status')} taskId={row.original.id} />
      );
    },
  },

  {
    accessorKey: 'title',
    cell: ({ row }) => {
      const labels = row.original.labels.length >= 1;
      return (
        <div className={`${labels ? 'sm:w-[35rem]' : 'sm:w-[59rem]'} w-52`}>
          <div className="w-full truncate text-base font-medium">
            {row.getValue('title')}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'labels',
    cell: ({ row }) => {
      const values: Label[] = row.getValue('labels');

      return (
        <>
          {values.length >= 1 && (
            <div className="hidden w-96 sm:flex sm:justify-end">
              <LabelList labels={values} />
            </div>
          )}
        </>
      );
    },
  },
  {
    accessorKey: 'due_date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('due_date'));

      const { icon, title } = getDueDateIcon(date ?? '');
      return (
        <div className="hidden w-5 sm:flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{icon}</TooltipTrigger>
              <TooltipContent sideOffset={6}>
                <div className="flex gap-2 p-1">
                  {icon}
                  <div className="flex flex-col gap-1 text-stone-700">
                    <p className="text-base font-bold">
                      Due on {format(date, 'MMM d')}
                    </p>
                    <p className="text-stone-600">{title}</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: 'estimative',
    cell: ({ row }) => {
      const point = parseInt(row.getValue('estimative')) ?? 0;
      return (
        <div>
          {point >= 1 && (
            <Estimative estimative={point} taskId={row.original.id} />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'created_at',
    cell: ({ row }) => {
      return (
        <div className="hidden w-12 sm:flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-stone-600">
                {format(new Date(row.getValue('created_at')), 'MMM d')}
              </TooltipTrigger>
              <TooltipContent sideOffset={6} className="text-stone-700">
                {`Created ${format(new Date(row.getValue('created_at')), 'MMM d, HH:mm:ss')}`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: 'updated_at',
    cell: ({ row }) => {
      return (
        <div className="hidden text-end sm:flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-12 text-stone-600">
                {format(new Date(row.getValue('updated_at')), 'MMM d')}
              </TooltipTrigger>
              <TooltipContent sideOffset={6} className="text-stone-700">
                {`Updated ${format(new Date(row.getValue('updated_at')), 'MMM d, HH:mm:ss')}`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: 'assigned_to',
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="mr-2 text-stone-600">
              <Avatar className="size-7">
                <AvatarImage
                  className="wrounded-"
                  src="https://api.dicebear.com/8.x/lorelei/svg?backgroundColor=8fc69b&hair=variant18&earrings=variant01&mouth=happy16&eyes=variant23&scale=160"
                />
              </Avatar>
            </TooltipTrigger>
            <TooltipContent sideOffset={6} className="text-stone-700">
              <div className="flex gap-2">
                <Avatar className="size-10">
                  <AvatarImage
                    className="wrounded-"
                    src="https://api.dicebear.com/8.x/lorelei/svg?backgroundColor=8fc69b&hair=variant18&earrings=variant01&mouth=happy16&eyes=variant23&scale=160"
                  />
                </Avatar>
                <div className="flex items-center gap-1 text-base">
                  <p className="text-base font-medium">{`${row.original.assigned_to?.full_name}`}</p>
                  <p className="text-stone-400">{` (${row.original.assigned_to?.username})`}</p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
