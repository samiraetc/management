import { getStatusesProps } from '@/lib/utils';
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
import { statuses } from '@/mock/statuses';

interface StatusCell {
  status: string;
  taskId: string;
}

const StatusCell = ({ status }: StatusCell) => {
  return (
    <div className="w-4 text-stone-600 sm:w-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {getStatusesProps(status).icon}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Command className="w-60 text-gray-700">
            <CommandInput
              placeholder="Change status..."
              autoFocus
              className="text-base"
            />

            <CommandList className="p-1">
              <CommandEmpty>No results found.</CommandEmpty>

              {statuses.map((stat, index) => {
                const { icon, label } = getStatusesProps(stat.key);
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

                      {status === stat.key && (
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

export default StatusCell;
