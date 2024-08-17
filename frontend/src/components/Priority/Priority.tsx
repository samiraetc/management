import { cn, getPriorityProps, TaskPriority } from '@/lib/utils';
import React, { useState } from 'react';
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
  task: Task;
  label?: boolean;
  className?: string;
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

const Priority = ({ priority, label, className }: IPriority) => {
  const [value, setValue] = useState<TaskPriority>(priority);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={!label ? 'ml-2 w-4 sm:ml-0' : ''}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          onClick={() => setOpen(true)}
          className={cn(
            label &&
              'flex h-8 w-48 items-center gap-2 p-1 text-xs font-medium text-foreground hover:rounded-md hover:bg-muted/70',
            className,
          )}
        >
          <span>{getPriorityProps(value).icon}</span>
          {label && <p>{getPriorityProps(value).label}</p>}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="left" className="w-56">
          <Command className="w-full text-gray-700">
            <CommandInput
              placeholder="Change priority..."
              autoFocus
              className="text-sm"
            />

            <CommandList className="p-1">
              <CommandEmpty>No results found.</CommandEmpty>

              {priorities.map((priori, index) => {
                const key = priori.key as TaskPriority;
                const { icon, label } = getPriorityProps(key);
                return (
                  <CommandItem
                    className="cursor-pointer px-4 py-1.5"
                    key={index}
                    onSelect={() => {
                      setValue(key);
                      setOpen(false);
                    }}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-4">
                        {icon}
                        <p className="text-sm"> {label}</p>
                      </div>

                      {value === priori.key && (
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
