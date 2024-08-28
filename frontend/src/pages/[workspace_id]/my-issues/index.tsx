import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/DataTable/DataTable';
import { getStatusesProps } from '@/lib/utils';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { statuses } from '@/mock/statuses';
import withLayout from '@/utils/hoc/withLayout';
import { columns } from '@/utils/columns';
import CreateTask from '@/components/CreateTask/CreateTask';
import { getAllTasksByUserFilters } from '@/services/Task/taskService';

const MyIssues = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleGetAllTasks = async () => {
    await getAllTasksByUserFilters('created').then((response) =>
      setTasks(response),
    );
  };

  useEffect(() => {
    handleGetAllTasks();
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <div className="sticky -top-0.5 z-50 w-full rounded-sm border-b bg-background">
        <p className="border-b py-2 pl-4 font-medium sm:pl-7 sm:pr-4">
          My issues
        </p>
      </div>

      <div>
        {tasks.length >= 1 ? (
          <div className="h-screen overflow-y-auto pb-24">
            {statuses.map((status) => {
              const filteredTasks = tasks.filter(
                (task) => task.status === status.key,
              );

              if (filteredTasks.length === 0) return null;
              return (
                <section key={status.id} className="">
                  <div className="flex items-center justify-between bg-secondary py-2 pl-3.5 pr-5 sm:pl-7 sm:pr-2">
                    <div className="flex items-center gap-2">
                      {getStatusesProps(status.key)?.icon}
                      <span className="text-md font-medium">{status.key}</span>
                      <span className="mt-0.5 text-sm text-stone-500">
                        {
                          tasks.filter((task) => task.status === status.key)
                            .length
                        }
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
                      data={tasks.filter((task) => task.status === status.key)}
                      columns={columns}
                    />
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="flex h-screen items-center justify-center">
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
      </div>

      {openCreate && <CreateTask open={openCreate} setOpen={setOpenCreate} />}
    </div>
  );
};

export default withLayout(MyIssues);
