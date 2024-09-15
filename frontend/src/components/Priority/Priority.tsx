import { cn, getPriorityProps, TaskPriority } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { Check } from 'lucide-react';
import { getPriorities } from '@/services/Priorities/prioritiesService';
import useWindowSize from '@/hook/useWindowSize/useWindowSize';
import { updateTaskDetails } from '@/services/Task/taskService';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface IPriority {
  priority: TaskPriority;
  task?: Task;
  label?: boolean;
  className?: string;
  setProperties?: (value: TaskPriority) => void;
}

const PriorityList = ({
  priorities,
  value,
  setValue,
  onClose,
}: {
  priorities: Priority[];
  value: TaskPriority;
  setValue: (val: TaskPriority) => void;
  onClose: () => void;
}) => (
  <>
    <CommandInput
      placeholder="Change priority..."
      autoFocus
      className="text-sm"
    />

    <CommandList className="p-1">
      <CommandEmpty>No results found.</CommandEmpty>

      {priorities?.map((priori, index) => {
        const key = priori.name as TaskPriority;

        const { icon, label } = getPriorityProps(key);
        return (
          <CommandItem
            className="cursor-pointer px-4 py-1.5"
            key={index}
            onSelect={() => {
              setValue(key);
              onClose();
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
  </>
);

const Priority = ({
  priority,
  label,
  className,
  task,
  setProperties,
}: IPriority) => {
  const [value, setValue] = useState<TaskPriority>(priority);
  const [open, setOpen] = useState<boolean>(false);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const isMobile = useWindowSize();

  const handleGetPriorities = async () => {
    if (!openDialog && !open) {
      return await getPriorities().then((response) => {
        setPriorities(response);
        isMobile ? setOpenDialog(true) : setOpen(true);
      });
    } else {
      isMobile ? setOpenDialog(!openDialog) : setOpen(!open);
    }
  };

  const handleSetValue = async (value: TaskPriority) => {
    setValue(value);
    setProperties
      ? setProperties(value)
      : await updateTaskDetails(task?.id ?? '', {
          priority: value,
        });
  };

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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={cn(
            'outline-none',
            label &&
              'flex h-8 w-48 items-center gap-2 p-1 text-xs font-medium text-foreground hover:rounded-md hover:bg-muted/70',
            className,
          )}
          onClick={() => handleGetPriorities()}
        >
          <span>{getPriorityProps(value ?? '')?.icon}</span>
          {label && (
            <p className="text-stone-600 dark:text-white">{getPriorityProps(value)?.label}</p>
          )}
        </PopoverTrigger>

        {!isMobile && (
          <PopoverContent className="w-56 p-1" align="center" side="bottom">
            <Command className="w-full text-gray-700">
              <PriorityList
                priorities={priorities}
                value={value}
                setValue={handleSetValue}
                onClose={() => setOpen(false)}
              />
            </Command>
          </PopoverContent>
        )}
      </Popover>

      {isMobile && (
        <CommandDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          showClose={false}
          className="top-1/4 w-11/12 -translate-x-1/2 translate-y-[-12%] rounded-md sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2"
        >
          <div className="mb-2 mt-3 px-3">
            <p className="max-w-full truncate rounded-sm border bg-muted p-1 text-xs text-muted-foreground">{`${task?.identifier} - ${task?.title}`}</p>
          </div>
          <PriorityList
            priorities={priorities}
            value={value}
            setValue={handleSetValue}
            onClose={() => setOpenDialog(false)}
          />
        </CommandDialog>
      )}
    </div>
  );
};

export default Priority;
