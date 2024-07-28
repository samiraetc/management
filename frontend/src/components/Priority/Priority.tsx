import { getPriorityProps, TaskPriority } from '@/lib/utils';
import React from 'react';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check } from 'lucide-react';

interface IPriority {
  priority: TaskPriority;
  taskId: string;
}

export const priorities = [
  {
    id: '1',
    key: 'none',
  },
  {
    id: '2',
    key: 'urgent',
  },
  {
    id: '3',
    key: 'high',
  },
  {
    id: '4',
    key: 'medium',
  },
  {
    id: '4',
    key: 'low',
  },
];

const Priority = ({ priority }: IPriority) => {
  return (
    <div className="ml-2 w-4 sm:ml-0">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {getPriorityProps(priority).icon}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Command className="w-60 text-gray-700">
            <CommandInput
              placeholder="Change priority..."
              autoFocus
              className="text-base"
            />

            <CommandList className="p-1">
              <CommandEmpty>No results found.</CommandEmpty>

              {priorities.map((priori, index) => {
                const { icon, label } = getPriorityProps(
                  priori.key as TaskPriority,
                );
                return (
                  <CommandItem
                    className="cursor-pointer px-4 py-1.5"
                    key={index}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-4">
                        {icon}
                        <p className="text-base"> {label}</p>
                      </div>

                      {priority === priori.key && (
                        <Check width={20} height={20} className="mr-2" />
                      )}
                    </div>
                    <CommandShortcut>{index + 1}</CommandShortcut>
                  </CommandItem>
                );
              })}
            </CommandList>
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Priority;
