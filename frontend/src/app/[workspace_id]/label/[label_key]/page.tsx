'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/DataTable/DataTable';
import { getStatusesProps } from '@/lib/utils';
import { Check, ChevronDown, CircleAlert, Link, Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { statuses } from '@/mock/statuses';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getLabels } from '@/services/Label/labelService';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { copyUrlToClipboard } from '@/utils/clipboard';
import { useSession } from 'next-auth/react';
import { issueColumns } from '@/utils/columns';

const LabelIndex = () => {
  const route = useRouter();
  const params = useParams();
  const labelKey = (params.label_key as string) ?? '';
  const workspaceId = (params.workspace_id as string) ?? '';
  const tasks: Task[] = [];

  const { data: session } = useSession();
  const [workspaceLabels, setWorkspaceLabels] = useState<Label[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<Label>({
    id: '',
    name: labelKey,
    color: '',
    can_edit: false,
    created_at: '',
  });
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );

  const filteredDataByLabel = (tasks: Tasks) => {
    return tasks.filter((task: Task) =>
      task.labels.some((label: Label) => label.name === selectedLabel?.name),
    );
  };

  const handleGetWorkspaceLabels = async () => {
    if (!workspace?.id || !session?.user?.token) return;

    await getLabels(workspace?.id ?? '').then((response) => {
      setWorkspaceLabels(response);
      const matchingLabel = response.find(
        (label: Label) => label.name === labelKey,
      );
      if (matchingLabel) {
        setSelectedLabel(matchingLabel);
      } else {
        setSelectedLabel({
          id: '',
          name: labelKey,
          color: '',
          can_edit: false,
          created_at: '',
        });
      }
    });
  };

  useEffect(() => {
    handleGetWorkspaceLabels();
  }, [labelKey]);

  const handleSelectNewLabel = (label: Label) => {
    setSelectedLabel(label);
    route.push(`/${workspace?.url_key}/label/${label.name}`);
  };

  const tasksByStatusAndLabel = filteredDataByLabel(tasks);

  return (
    <>
      {selectedLabel?.id ? (
        <>
          <div className="sticky -top-0.5 z-50 w-full rounded-sm border-b bg-background">
            <p className="flex items-center justify-between border-b py-2 pl-6 font-medium sm:pl-6 sm:pr-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-lg p-1.5"
                      style={{ backgroundColor: selectedLabel?.color }}
                    ></div>
                    <p className="text-base"> {selectedLabel?.name}</p>
                  </div>

                  <ChevronDown width={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Command className="w-60 text-gray-700">
                      <CommandInput
                        placeholder="Open label..."
                        autoFocus
                        className="text-base"
                      />

                      <CommandList className="p-1">
                        <CommandEmpty>No results found.</CommandEmpty>

                        {workspaceLabels.map((label, index) => {
                          return (
                            <CommandItem
                              className="cursor-pointer px-4 py-1.5"
                              key={index}
                            >
                              <div
                                className="flex w-full items-center justify-between"
                                onClick={() => handleSelectNewLabel(label)}
                              >
                                <div className="flex items-center gap-4">
                                  <div
                                    className="rounded-lg p-1.5"
                                    style={{ backgroundColor: label.color }}
                                  ></div>
                                  <p className="text-base"> {label.name}</p>
                                </div>
                                {label.name === selectedLabel?.name && (
                                  <Check
                                    width={20}
                                    height={20}
                                    className="mr-2"
                                  />
                                )}
                              </div>
                            </CommandItem>
                          );
                        })}
                      </CommandList>
                    </Command>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                onClick={() => copyUrlToClipboard()}
                size={16}
                className="cursor-pointer"
              />
            </p>
          </div>

          {tasksByStatusAndLabel.length >= 1 ? (
            <div className="mb-24">
              {statuses.map((status) => {
                const tasksByStatusAndLabel = filteredDataByLabel(
                  tasks.filter((task: Task) => task.status === status.key),
                );
                return tasksByStatusAndLabel.length === 0 ? null : (
                  <section key={status.id}>
                    <div className="flex items-center justify-between bg-secondary py-2 pl-1.5 pr-5 sm:pl-6 sm:pr-2">
                      <div className="flex items-center gap-4">
                        {getStatusesProps(status.key)?.icon}
                        <span className="text-md font-medium">
                          {status.key}
                        </span>
                        <span>{tasksByStatusAndLabel.length}</span>
                      </div>

                      <Plus width={18} className="text-stone-500" />
                    </div>
                    <div className="sm:p-0">
                      <DataTable
                        data={tasksByStatusAndLabel}
                        columns={issueColumns(workspaceId)}
                      />
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="flex h-[90%] items-center justify-center">
              <div className="flex flex-col items-center justify-center align-middle">
                <p className="text-lg font-medium text-gray-500">
                  No matching issues
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex items-center gap-2">
            <CircleAlert className="size-5" />
            <p className="font-medium">Label not found</p>
          </div>
          <p>
            There is no label with the name <b>{labelKey}</b>
          </p>
        </div>
      )}
    </>
  );
};

export default LabelIndex;
