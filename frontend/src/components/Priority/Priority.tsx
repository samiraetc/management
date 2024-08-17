import { cn, getPriorityProps, TaskPriority } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
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
import { getPriorities } from '@/services/Priorities/prioritiesService';

interface IPriority {
  priority: TaskPriority;
  task: Task;
  label?: boolean;
  className?: string;
}

const Priority = ({ priority, label, className }: IPriority) => {
  const [value, setValue] = useState<TaskPriority>(priority);
  const [open, setOpen] = useState<boolean>(false);
  const [priorities, setPriorities] = useState<Priority[]>([]);

  const handleGetPriorities = async () => {
    await getPriorities().then((response) => {
      setPriorities(response);
    });
  };

  useEffect(() => {
    handleGetPriorities();
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'P' || e.key === 'p') && (e.metaKey || e.ctrlKey) && e) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  });

  return (
    <div className={!label ? 'ml-2 w-4 sm:ml-0' : ''}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <div onClick={() => setOpen(true)}>
          <DropdownMenuTrigger
            className={cn(
              "outline-none",
              label &&
                'flex h-8 w-48 items-center gap-2 p-1 text-xs font-medium text-foreground hover:rounded-md hover:bg-muted/70',
              className,
            )}
          >
            <span>{getPriorityProps(value)?.icon}</span>
            {label && <p>{getPriorityProps(value)?.label}</p>}
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent align="start" side="left" className="w-56">
          <Command className="w-full text-gray-700">
            <CommandInput
              placeholder="Change priority..."
              autoFocus
              className="text-sm"
            />

            <CommandList className="p-1">
              <CommandEmpty>No results found.</CommandEmpty>

              {priorities?.map((priori, index) => {
                const key = priori.name as TaskPriority;

                console.log(priorities);
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

                      {value === priori.name && (
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
