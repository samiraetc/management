'use client';

import React, { useState } from 'react';
import { DataTable } from '@/components/DataTable/DataTable';
import { getStatusesProps } from '@/lib/utils';
import { Pencil, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { statuses } from '@/mock/statuses';
import { issueColumns } from '@/utils/columns';
import CreateTask from '@/components/CreateTask/CreateTask';
import { useParams } from 'next/navigation';
import { useIssueContext } from '@/context/issueProvider';

const MyIssues = () => {
  const params = useParams();
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const workspaceId = (params.workspace_id as string) ?? '';
  const filterKey = (params.filter as FilterTaskKey) ?? 'created';
  const { tasks } = useIssueContext();

  const noIssueMessage: Record<FilterTaskKey, string> = {
    created: 'No issues created by you',
    assigned: 'No issues assigned to you',
  };

  return (
    <div className="h-screen overflow-y-auto pb-24">
      {tasks.length >= 1 ? (
        statuses.map((status) => {
          const statusTasks = tasks.filter(
            (task) => task.status === status.key,
          );

          if (statusTasks.length === 0) return null;

          return (
            <section key={status.id} className="">
              <div className="flex items-center justify-between border-b bg-gray-50 dark:bg-accent py-2 pl-3.5 pr-5 sm:pl-7 sm:pr-2">
                <div className="flex items-center gap-2">
                  {getStatusesProps(status.key)?.icon}
                  <span className="text-sm font-medium">{status.name}</span>
                  <span className="mt-0.5 text-sm text-stone-500">
                    {statusTasks.length}
                  </span>
                </div>
                <Plus
                  width={18}
                  className="cursor-pointer text-stone-500"
                  onClick={() => setOpenCreate(true)}
                />
              </div>
              <div className="z-0 sm:p-0">
                <DataTable
                  data={statusTasks}
                  columns={issueColumns(workspaceId)}
                />
              </div>
            </section>
          );
        })
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-4 align-middle">
            <p className="text-lg font-medium text-gray-500">
              {noIssueMessage[filterKey]}
            </p>
            <div>
              <Button
                variant="outline"
                className="flex h-8 w-36 items-center gap-2 border-gray-300 text-base shadow-sm"
              >
                <Pencil size={18} onClick={() => setOpenCreate(true)} />
                New Issue
              </Button>
            </div>
          </div>
        </div>
      )}
      {openCreate && <CreateTask open={openCreate} setOpen={setOpenCreate} />}
    </div>
  );
};

export default MyIssues;
