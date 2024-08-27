import { cn, getEstimativeProps } from '@/lib/utils';
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check } from 'lucide-react';
import { IoPrism } from 'react-icons/io5';
import { getEstimativeByName } from '@/services/Estimatives/estimativeService';
import useWindowSize from '@/hook/useWindowSize/useWindowSize';
import { updateTaskDetails } from '@/services/Task/taskService';

interface IEstimative {
  estimative: string | null;
  task?: Task;
  label?: boolean;
  className?: string;
  setProperties?: (value: string | null) => void;
}

const EstimativeList = ({
  points,
  value,
  setValue,
  onClose,
}: {
  points: (string | null)[];
  value: string | null;
  setValue: (selected: string | null) => void;
  onClose: () => void;
}) => (
  <>
    <CommandInput
      placeholder="Change estimative..."
      autoFocus={true}
      className="text-sm"
    />

    <CommandList className="p-1">
      <CommandEmpty>No results found.</CommandEmpty>

      {points.map((point, index) => {
        return (
          <CommandItem
            className="cursor-pointer px-4 py-1.5"
            key={index}
            onSelect={() => {
              setValue(point);
              onClose();
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
            {point === '0' && <CommandShortcut>0</CommandShortcut>}
          </CommandItem>
        );
      })}
    </CommandList>
  </>
);

const Estimative = ({
  estimative,
  label,
  className,
  task,
  setProperties,
}: IEstimative) => {
  const [value, setValue] = useState<string | null>(estimative);
  const [open, setOpen] = useState<boolean>(false);
  const [estimatives, setEstimatives] = useState<Estimative>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const isMobile = useWindowSize();

  const handleGetEstimatives = async () => {
    await getEstimativeByName('exponential').then((response) => {
      setEstimatives(response);
    });
  };

  useEffect(() => {
    handleGetEstimatives();
  }, []);

  const handleSetValue = async (value: string | null) => {
    setValue(value);
    setProperties ? setProperties(value) :  await updateTaskDetails(task?.id ?? '', {
      estimative: value,
    });;
  };
  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          onClick={() => (isMobile ? setOpenDialog(true) : setOpen(true))}
          className={cn(
            'outline-none',
            label
              ? 'flex h-8 w-48 items-center gap-2 p-1 text-xs font-medium text-foreground hover:rounded-md hover:bg-muted/70'
              : 'hidden items-center justify-start gap-1 text-xs font-normal text-stone-600 dark:text-white sm:flex',
            className,
          )}
        >
          <IoPrism />

          {label ? value ? <p>{getEstimativeProps(value ?? null)}</p> : 'Set Estimative' : value}
        </DropdownMenuTrigger>

        {!isMobile && (
          <DropdownMenuContent className="w-56" align="center" side="bottom">
            <Command className="w-full text-gray-700">
              <EstimativeList
                points={[null, ...(estimatives?.points ?? [])]}
                value={value}
                setValue={handleSetValue}
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
          <EstimativeList
            points={[null, ...(estimatives?.points ?? [])]}
            value={value}
            setValue={handleSetValue}
            onClose={() => setOpenDialog(false)}
          />
        </CommandDialog>
      )}
    </div>
  );
};

export default Estimative;
