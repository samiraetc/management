import React from 'react';
import { DataTable } from '@/components/DataTable/DataTable';
import { getStatusesProps } from '@/lib/utils';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { statuses } from '@/mock/statuses';
import { tasks } from '@/mock/tasks';
import withLayout from '@/utils/hoc/withLayout';
import { columns } from '@/utils/columns';

const MyIssues = () => {
  return (
    <>
      <div className="sticky -top-0.5 z-50 w-full border-b bg-background">
        <p className="border-b py-2 pl-6 font-medium sm:pl-6 sm:pr-4">
          My issues
        </p>
        {/* <p className="py-2 pl-6 font-medium sm:pl-6 sm:pr-4">filter</p> */}
      </div>

      {tasks.length >= 1 ? (
        <div className="mb-24">
          {statuses.map((status) => (
            <section key={status.id}>
              <div className="flex items-center justify-between bg-secondary py-2 pl-1.5 pr-2 sm:pl-10 sm:pr-2">
                <div className="flex items-center gap-4">
                  {getStatusesProps(status.key)?.icon}
                  <span className="text-md font-medium">{status.key}</span>
                  <span>
                    {tasks.filter((task) => task.status === status.key).length}
                  </span>
                </div>

                <Plus width={18} className="text-stone-500" />
              </div>
              <div className="sm:p-0">
                <DataTable
                  data={tasks.filter((task) => task.status === status.key)}
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
    </>
  );
};

export default withLayout(MyIssues);
