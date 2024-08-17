import { cn, getStatusesProps } from '@/lib/utils';
import React, { useState } from 'react';
import {
  Command,
  CommandDialog,
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
import useWindowSize from '@/hook/useWindowSize/useWindowSize';

interface IStatus {
  status: string;
  task: Task;
  label?: boolean;
  className?: string;
}

const StatusList = ({
  value,
  setValue,
  onClose,
}: {
  value: string;
  setValue: (val: string) => void;
  onClose: () => void;
}) => (
  <>
    <CommandInput
      placeholder="Change status..."
      className="text-md sm:text-sm"
    />
    <CommandList className="p-2 sm:p-1">
      <CommandEmpty>No results found.</CommandEmpty>
      {statuses.map((stat, index) => {
        const { icon, label } = getStatusesProps(stat.key);
        return (
          <CommandItem
            className="cursor-pointer px-4 py-1.5"
            key={index}
            onSelect={() => {
              setValue(stat.key);
              onClose();
            }}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
                {icon}
                <p className="text-sm">{label}</p>
              </div>
              {value === stat.key && (
                <Check width={20} height={20} className="mr-2" />
              )}
            </div>
            <CommandShortcut>{index + 1}</CommandShortcut>
          </CommandItem>
        );
      })}
    </CommandList>
  </>
);

const Status = ({ status, label, className, task }: IStatus) => {
  const [value, setValue] = useState<string>(status);
  const [open, setOpen] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const isMobile = useWindowSize();

  return (
    <div className="text-stone-600">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          onClick={() => (isMobile ? setOpenDialog(true) : setOpen(true))}
          className={cn(
            label &&
              'flex h-8 w-48 items-center gap-2 p-1 text-xs font-medium text-foreground hover:rounded-md hover:bg-muted/70',
            className,
          )}
        >
          {getStatusesProps(value).icon}
          {label && <p className="pl-0.5">{getStatusesProps(value).label}</p>}
        </DropdownMenuTrigger>

        {!isMobile && (
          <DropdownMenuContent align="start" side="left" className="w-56">
            <Command className="w-full text-gray-700">
              <StatusList
                value={value}
                setValue={setValue}
                onClose={() => setOpen(false)}
              />
            </Command>
          </DropdownMenuContent>
        )}
      </DropdownMenu>

      {isMobile && (
        <CommandDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          overlayClassName="bg-black/10"
          showClose={false}
          className="top-1/4 w-11/12 -translate-x-1/2 translate-y-[-12%] rounded-md sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2"
        >
          <div className="mb-2 mt-3 px-3">
            <p className="max-w-full truncate rounded-sm border bg-muted p-1 text-xs text-muted-foreground">{`${task?.identifier} - ${task?.title}`}</p>
          </div>
          <StatusList
            value={value}
            setValue={setValue}
            onClose={() => setOpenDialog(false)}
          />
        </CommandDialog>
      )}
    </div>
  );
};

export default Status;
