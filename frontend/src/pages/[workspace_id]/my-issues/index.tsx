import Layout from '@/components/Layout/Layout';
import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/DataTable/DataTable';
import {
  getDueDateIcon,
  getPriorityProps,
  getStatusesProps,
} from '@/lib/utils';
import { columns } from './columns';
import { Plus, Shell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useSession } from 'next-auth/react';
import { getTaskAssignedByUserId } from '@/services/Task/taskService';
import { data } from './data';
import LabelList from '@/components/LabelList/LabelList';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

const statuses = [
  {
    id: '1',
    key: 'backlog',
  },
  {
    id: '2',
    key: 'to_do',
  },
  {
    id: '3',
    key: 'doing',
  },
  {
    id: '4',
    key: 'done',
  },
  {
    id: '4',
    key: 'canceled',
  },
];

const MyIssues = () => {
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );

  const { data: session } = useSession();

  return (
    <Layout>
      <div className=" z-50 w-full border-b bg-background sticky -top-0.5 ">
        <p className="border-b py-2 pl-6 font-medium sm:pl-6 sm:pr-4">
          My issues
        </p>
        <p className="py-2 pl-6 font-medium sm:pl-6 sm:pr-4">filter</p>
      </div>

      {data.length >= 1 ? (
        <div className="mb-24">
          {statuses.map((status) => (
            <section key={status.id}>
              <div className="flex items-center justify-between bg-secondary py-2 pl-1.5 pr-2 sm:pl-10 sm:pr-2">
                <div className="flex gap-4 items-center">
                  {getStatusesProps(status.key)?.icon}
                  <span className="font-medium text-md">{status.key}</span>
                  <span>
                    {data.filter((task) => task.status === status.key).length}
                  </span>
                </div>

                <Plus width={18} className="text-stone-500" />
              </div>
              <div className="sm:p-0">
                {/* {data
                  .filter((item) => item.status === status.key)
                  .map((task) => {
                    return (
                      <div className="flex gap-2 border-b p-2 text-sm items-center justify-between">
                        <div className="flex w-28 items-center gap-2 align-middle justify-between">
                          <span> {getPriorityProps(task.priority).icon}</span>
                          <span> {task.identifier}</span>
                          <span>{getStatusesProps(task.status).icon}</span>
                        </div>

                        <div className="w-2/6 truncate">{task.title}</div>

                        <div className="flex w-96 items-end justify-end">
                          <LabelList labels={task.labels} />
                        </div>

                        <div>
                          {getDueDateIcon(new Date(task.created_at)).icon}
                        </div>

                        <div className="flex items-center gap-1">
                          <Shell width={10} />
                          {task.estimative}
                        </div>

                        <div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="text-stone-600">
                                {format(new Date(task.created_at), 'MMM d')}
                              </TooltipTrigger>
                              <TooltipContent
                                sideOffset={6}
                                className="text-stone-700"
                              >
                                {`Created ${format(new Date(task.created_at), 'MMM d, HH:mm:ss')}`}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        <div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="text-stone-600">
                                {format(new Date(task.updated_at), 'MMM d')}
                              </TooltipTrigger>
                              <TooltipContent
                                sideOffset={6}
                                className="text-stone-700"
                              >
                                {`Updated ${format(new Date(task.updated_at), 'MMM d, HH:mm:ss')}`}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        <div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="text-stone-600">
                                <Avatar className="size-6">
                                  <AvatarImage
                                    className="wrounded-"
                                    src="https://api.dicebear.com/8.x/lorelei/svg?backgroundColor=8fc69b&hair=variant18&earrings=variant01&mouth=happy16&eyes=variant23&scale=160"
                                  />
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent
                                sideOffset={6}
                                className="text-stone-700"
                              >
                                <div className="flex gap-2">
                                  <Avatar className="size-10">
                                    <AvatarImage
                                      className="wrounded-"
                                      src="https://api.dicebear.com/8.x/lorelei/svg?backgroundColor=8fc69b&hair=variant18&earrings=variant01&mouth=happy16&eyes=variant23&scale=160"
                                    />
                                  </Avatar>
                                  <div className="flex items-center gap-1 text-base">
                                    <p className="text-base font-medium">{`${task.assigned_to?.full_name}`}</p>
                                    <p className="text-stone-400">{` (${task.assigned_to?.username})`}</p>
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    );
                  })} */}
                <DataTable
                  data={data.filter((task) => task.status === status.key)}
                  columns={columns}
                />
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="flex h-[90%] items-center justify-center">
          <div className="flex flex-col items-center justify-center align-middle">
            <p className="text-lg font-medium text-gray-500">
              No issues assigned to you
            </p>

            <div>
              <Button
                variant="outline"
                className="flex h-8 w-36 items-center gap-2 border-gray-300 text-base shadow-sm"
              >
                <HiOutlinePencilSquare size={18} />
                New Issue
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MyIssues;
