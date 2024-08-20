import React, { useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { CalendarDays, CalendarX } from 'lucide-react';
import { addDays, format, parse } from 'date-fns';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '../ui/calendar';
import { getDueDateIcon } from '@/lib/utils';
import { HiCalendar } from 'react-icons/hi2';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface IDueDate {
  task: Task;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  dueDate: Date | string | null;
  dialog?: boolean;
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

const DueDate = ({ task, open, setOpen, dueDate, dialog }: IDueDate) => {
  const [value, setValue] = useState<Date | null>(new Date(dueDate ?? ''));

  return (
    <div>
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
            setValue={setValue}
            onClose={() => setOpen && setOpen(false)}
          />
        </CommandDialog>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex w-full items-center justify-between">
              <div className="flex cursor-pointer items-center gap-2">
                {value ? (
                  getDueDateIcon(value).icon
                ) : (
                  <HiCalendar size={18} className="text-gray-500" />
                )}
                <p className="text-sm">{format(value ?? '', 'dd/MM/yyyy')}</p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side="left"
            className="flex w-full items-center"
          >
            <Calendar
              mode="single"
              selected={value ?? undefined}
              onSelect={(selectedDate) => setValue(selectedDate ?? null)}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default DueDate;
