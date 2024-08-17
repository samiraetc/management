import { cn, getEstimativeProps } from '@/lib/utils';
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
import { IoPrism } from 'react-icons/io5';

interface IEstimative {
  estimative: number | null;
  task: Task;
  label?: boolean;
  className?: string;
}

export const estimatives = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  name: 'exponential',
  points: [null, 1, 2, 4, 8, 16],
};

const Estimative = ({ estimative, label, className }: IEstimative) => {
  const [value, setValue] = useState<number | null>(estimative);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          onClick={() => setOpen(true)}
          className={cn(
            'outline-none',
            label
              ? 'flex h-8 w-48 items-center gap-2 p-1 text-xs font-medium text-foreground hover:rounded-md hover:bg-muted/70'
              : 'hidden items-center justify-start gap-1 text-xs font-normal text-stone-600 dark:text-white sm:flex',
            className,
          )}
        >
          <IoPrism />

          {label ? <p>{getEstimativeProps(value ?? null)}</p> : value}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="left" className="w-56">
          <Command className="w-full text-gray-700">
            <CommandInput
              placeholder="Change estimative..."
              autoFocus={true}
              className="text-sm"
            />

            <CommandList className="p-1">
              <CommandEmpty>No results found.</CommandEmpty>

              {estimatives.points.map((point, index) => {
                return (
                  <CommandItem
                    className="cursor-pointer px-4 py-1.5"
                    key={index}
                    onSelect={() => {
                      setValue(point);
                      setOpen(false);
                    }}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-4">
                        <IoPrism />
                        <p className="text-sm">{getEstimativeProps(point)}</p>
                      </div>

                      {value === point && (
                        <Check width={20} height={20} className="mr-2" />
                      )}
                    </div>
                    {point === 0 && <CommandShortcut>0</CommandShortcut>}
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

export default Estimative;
