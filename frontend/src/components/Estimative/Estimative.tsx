import { getEstimativeProps } from '@/lib/utils';
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
import { IoPrism } from 'react-icons/io5';

interface IEstimative {
  estimative: number;
  taskId: string;
}

export const estimatives = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  name: 'exponential',
  points: [0, 1, 2, 4, 8, 16],
};

const Estimative = ({ estimative }: IEstimative) => {
  return (
    <div className="w-8">
      <DropdownMenu>
        <DropdownMenuTrigger className="hidden items-center justify-start gap-1 text-xs font-normal text-stone-600 dark:text-white sm:flex">
          <IoPrism />
          {estimative}
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

              {estimatives.points.map((point, index) => {
                return (
                  <CommandItem
                    className="cursor-pointer px-4 py-1.5"
                    key={index}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-4">
                        <IoPrism />
                        <p className="text-base">
                          {' '}
                          {getEstimativeProps(point)}
                        </p>
                      </div>

                      {estimative === point && (
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
