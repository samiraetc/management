import React, { useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { CalendarDays, CalendarX, X } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '../ui/calendar';
import { cn, getDueDateIcon } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useWindowSize from '@/hook/useWindowSize/useWindowSize';
import { updateTaskDetails } from '@/services/Task/taskService';

interface IDueDate {
  task?: Task;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  dueDate?: Date | string | null;
  dialog?: boolean;
  className?: string;
}

const DueDateList = ({
  value,
  setValue,
  onClose,
}: {
  value: Date | null;
  setValue: (selected: Date | null) => void;
  onClose: () => void;
}) => {
  const date = new Date();
  const daysUntilFriday = (5 - date.getDay() + 7) % 7;

  return (
    <>
      <CommandInput
        placeholder="Change due date..."
        autoFocus={true}
        className="text-md"
      />

      <CommandList className="cursor-pointer p-1">
        <CommandEmpty>No results found.</CommandEmpty>

        {value && (
          <CommandItem
            className="cursor-pointer"
            onSelect={() => {
              setValue(null);
              onClose();
            }}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarX width={12} />
                <p>Remove due date</p>
              </div>
            </div>
          </CommandItem>
        )}

        <CommandItem className="cursor-pointer">
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays width={12} />
                  <p>Custom...</p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="w-88 mt-24 p-4">
              <Calendar
                mode="single"
                selected={value ?? undefined}
                onSelect={(selectedDate) => {
                  setValue(selectedDate ?? null);
                  onClose();
                }}
              />
            </DialogContent>
          </Dialog>
        </CommandItem>

        <CommandItem
          className="cursor-pointer"
          onSelect={() => {
            setValue(addDays(date, 1));
            onClose();
          }}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays width={12} />
              <p>Tomorrow</p>
            </div>
            <p className="text-xs text-stone-500">
              {format(addDays(date, 1), 'EEE, dd MMM')}
            </p>
          </div>
        </CommandItem>
        <CommandItem
          className="cursor-pointer"
          onSelect={() => {
            setValue(addDays(date, daysUntilFriday));
            onClose();
          }}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays width={12} />
              <p>End of this week</p>
            </div>
            <p className="text-xs text-stone-500">
              {format(addDays(date, daysUntilFriday), 'EEE, dd MMM')}
            </p>
          </div>
        </CommandItem>
        <CommandItem
          className="cursor-pointer"
          onSelect={() => {
            setValue(addDays(date, 7));
            onClose();
          }}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays width={12} />
              <p>In one week</p>
            </div>
            <p className="text-xs text-stone-500">
              {format(addDays(date, 7), 'EEE, dd MMM')}
            </p>
          </div>
        </CommandItem>
      </CommandList>
    </>
  );
};

const DueDate = ({
  task,
  open,
  setOpen,
  dueDate,
  dialog,
  className,
}: IDueDate) => {
  const [value, setValue] = useState<Date | null>(
    dueDate ? new Date(dueDate) : null,
  );
  const isMobile = useWindowSize();

  const handleSetValue = async (date: Date | null) => {
    if (task) {
      await updateTaskDetails(task?.id ?? '', {
        due_date: date,
      });
    }
  };

  return (
    <div>
      {value && isMobile && (
        <div
          className={cn('flex gap-2', className)}
          onClick={() => setOpen && setOpen(true)}
        >
          {getDueDateIcon(value).icon}
          <p className="text-xs text-stone-600">
            {getDueDateIcon(value).label}
          </p>
        </div>
      )}

      {dialog ? (
        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          showClose={false}
          className="top-64 max-w-2xl"
        >
          <div className="mb-2 mt-3 px-3">
            <p className="max-w-full truncate rounded-sm border bg-muted p-1 text-sm text-muted-foreground">{`${task?.identifier} - ${task?.title}`}</p>
          </div>
          <DueDateList
            value={value}
            setValue={(valueee) => {
              setValue(valueee);
              handleSetValue(valueee);
            }}
            onClose={() => setOpen && setOpen(false)}
          />
        </CommandDialog>
      ) : (
        <Popover>
          <div className="flex h-8 w-48 items-center gap-2 rounded-md p-1 text-xs hover:bg-accent">
            <PopoverTrigger asChild>
              <div className="flex w-full items-center justify-between">
                <div className="flex cursor-pointer items-center gap-2">
                  {value ? (
                    getDueDateIcon(value).icon
                  ) : (
                    <CalendarDays size={18} className="text-gray-500" />
                  )}
                  {value ? (
                    <p className="text-xs font-medium text-stone-600">{format(value, 'dd/MM/yyyy')}</p>
                  ) : (
                    <p className="text-xs font-medium text-stone-600">Add due date</p>
                  )}
                </div>
              </div>
            </PopoverTrigger>
            {value && (
              <X
                width={16}
                onClick={() => {
                  setValue(null);
                  handleSetValue(null);
                }}
                className="cursor-pointer text-stone-600"
              />
            )}
          </div>
          <PopoverContent
            align="start"
            side="left"
            className="flex w-full items-center"
          >
            <Calendar
              mode="single"
              selected={value ?? undefined}
              onSelect={(selectedDate) => {
                setValue(selectedDate ?? null);
                handleSetValue(selectedDate ?? null);
              }}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default DueDate;
