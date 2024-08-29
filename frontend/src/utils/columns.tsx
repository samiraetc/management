'use client';

import { getDueDateIcon, TaskPriority } from '@/lib/utils';
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
import Status from '@/components/Status/Status';
import Priority from '@/components/Priority/Priority';
import Estimative from '@/components/Estimative/Estimative';
import { CircleUserRound } from 'lucide-react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Link from 'next/link';

export const issueColumns = (
  workspaceId: string,
  router: AppRouterInstance,
) => {
  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: 'items',
      cell: ({ row }) => {
        return (
          <div className="ml-2 flex w-full items-center justify-center gap-2 sm:ml-0">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
              className="mb-1.5 border-gray-400 hover:border-2 hover:border-neutral-900 sm:ml-0 sm:flex sm:justify-center sm:border-transparent"
            />

            <Priority
              priority={row.original.priority as TaskPriority}
              task={row.original}
              className="-ml-1 w-full sm:ml-0"
            />

            <DataTableCell
              value={row.original.identifier}
              className="mb-1 hidden w-14 justify-center text-clip text-stone-600 sm:flex"
            />

            <Status status={row.original.status} task={row.original} />
          </div>
        );
      },
    },

    {
      accessorKey: 'title',
      cell: ({ row }) => {
        const labels: Label[] = row.original.labels ?? [];
        const date = new Date(row.original.due_date ?? '');
        const hasLabel = labels.length >= 1;
        const estimative = parseInt(row.original.estimative ?? '');

        const { icon, title } = getDueDateIcon(date ?? '');
        return (
          <div className="ml-2 flex w-full cursor-pointer items-center justify-between space-x-1">
            <Link
              href={`/${workspaceId}/issue/${row.original.identifier}`}
              onClick={() => {
                sessionStorage.setItem('task', JSON.stringify(row.original));
              }}
            >
              <div
                className={`${hasLabel ? 'sm:w-[30rem]' : 'sm:w-[56rem]'} mb-1.5 w-64 truncate text-sm font-medium`}
              >
                {row.getValue('title')}
              </div>
            </Link>

            {(row.original.due_date || estimative >= 1 || hasLabel) && (
              <div className="hidden items-center justify-between gap-2 sm:flex">
                {hasLabel && (
                  <div className="w-80 sm:flex sm:justify-end">
                    <LabelList labels={labels} />
                  </div>
                )}

                {row.original.due_date && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>{icon}</TooltipTrigger>
                      <TooltipContent sideOffset={6}>
                        <div className="flex gap-2 p-1">
                          {icon}
                          <div className="flex flex-col gap-1 text-stone-700">
                            <p className="text-sm font-bold">
                              Due on {format(date, 'MMM d')}
                            </p>
                            <p className="text-stone-600">{title}</p>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {estimative >= 1 ? (
                  <div className="hidden sm:flex">
                    <Estimative
                      estimative={row.original.estimative}
                      task={row.original}
                    />
                  </div>
                ) : null}
              </div>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: 'dates',
      cell: ({ row }) => {
        return (
          <div className="ml-1.5 mr-1 flex items-center justify-end gap-3">
            <div className="hidden sm:flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs text-stone-600">
                    {format(new Date(row.original.created_at), 'MMM d')}
                  </TooltipTrigger>
                  <TooltipContent sideOffset={6} className="text-stone-700">
                    {`Created ${format(new Date(row.original.created_at), 'MMM d, HH:mm:ss')}`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="hidden text-end sm:flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs text-stone-600">
                    {format(new Date(row.original.updated_at), 'MMM d')}
                  </TooltipTrigger>
                  <TooltipContent sideOffset={6} className="text-stone-700">
                    {`Updated ${format(new Date(row.original.updated_at), 'MMM d, HH:mm:ss')}`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="mr-1 text-stone-600">
                  <Avatar className="size-6">
                    <>
                      {row.original.assigned?.image ? (
                        <AvatarImage
                          src={row.original.assigned?.image as string}
                          alt="Profile"
                          className="flex size-full rounded-full object-cover"
                        />
                      ) : (
                        <CircleUserRound
                          width={24}
                          height={24}
                          className="text-stone-500"
                        />
                      )}
                    </>
                  </Avatar>
                </TooltipTrigger>
                {row.original.assigned && (
                  <TooltipContent sideOffset={6} className="text-stone-700">
                    <div className="flex gap-2">
                      <>
                        {row.original.assigned?.image ? (
                          <Avatar className="size-10">
                            <AvatarImage
                              src={row.original.assigned?.image as string}
                              alt="Profile"
                              className="flex size-full rounded-full object-cover"
                            />
                          </Avatar>
                        ) : (
                          <CircleUserRound
                            width={20}
                            height={20}
                            className="text-stone-500"
                          />
                        )}
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-medium">{`${row.original.assigned?.full_name}`}</p>
                          <p className="text-stone-400">{` (${row.original.assigned?.username})`}</p>
                        </div>
                      </>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];

  return columns;
};
