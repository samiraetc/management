import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Plus, Tags } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { getTeamLabels } from '@/services/Label/labelService';
import { cn } from '@/lib/utils';
import { updateTaskDetails } from '@/services/Task/taskService';

interface LabelDropdownProps {
  labels: Label[];
  showList?: boolean;
  task?: Task;
  className?: string;
  position?: {
    align: 'start' | 'center' | 'end' | undefined;
    side: 'left' | 'top' | 'right' | 'bottom' | undefined;
  };
  setProperties?: (value: Label[]) => void;
  teamId?: string;
}

const LabelDropdown = ({
  labels,
  showList = true,
  className,
  position = {
    align: 'start',
    side: 'left',
  },
  setProperties,
  teamId,
  task,
}: LabelDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedLabels, setSelectedLabels] = useState<Label[]>(labels);
  const [labelList, setLabelList] = useState<Label[]>([]);

  const handleLabelToggle = (label: Label) => {
    const isSelected = selectedLabels.some(
      (selectedLabel) => selectedLabel.name === label.name,
    );

    if (isSelected) {
      const selected = selectedLabels.filter((l) => l.name !== label.name);
      setSelectedLabels(selected);
      handleSetValue(selected)
    } else {
      setSelectedLabels([...selectedLabels, label]);
      handleSetValue([...selectedLabels, label])
    }
  };

  useEffect(() => {
    const handleGetWorkspaceLabels = async () => {
      await getTeamLabels(teamId ?? '').then((response) => {
        setLabelList(response);
      });
    };

    handleGetWorkspaceLabels();
  }, []);

  const handleSetValue = async (value: Label[]) => {
    setProperties
      ? setProperties(value)
      : await updateTaskDetails(task?.id ?? '', {
          labels: value,
        });
  };



  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex flex-wrap items-center gap-2">
          {selectedLabels.length ? (
            showList ? (
              <>
                {selectedLabels.map((label, index) => (
                  <Badge
                    variant="outline"
                    key={index}
                    className="flex cursor-pointer items-center gap-2 py-1 text-xs font-normal text-stone-600 dark:text-white"
                    onClick={() => setOpen(!open)}
                  >
                    <div
                      className="rounded-lg p-1.5"
                      style={{ backgroundColor: label.color }}
                    ></div>
                    {label.name}
                  </Badge>
                ))}
                <div
                  className="flex size-6 cursor-pointer items-center justify-center gap-2 rounded-full p-1 text-center text-xs hover:bg-muted"
                  onClick={() => setOpen(!open)}
                >
                  <Plus width={15} />
                </div>
              </>
            ) : (
              <Badge
                variant="outline"
                className="flex h-7 items-center rounded-md p-1 px-3 text-sm font-normal text-stone-600 dark:text-white"
              >
                <div className="flex">
                  {selectedLabels
                    .slice(0, 2 + 3)
                    .map((label, index: number) => (
                      <div
                        key={index}
                        className="-ml-1.5 size-2.5 rounded-full border border-white"
                        style={{ backgroundColor: label.color }}
                      />
                    ))}
                </div>
                <span className="ml-1 text-[12px]">
                  {selectedLabels.length === 1
                    ? `${selectedLabels[0].name}`
                    : ` ${selectedLabels.length - 0} ${selectedLabels.length - 0 === 1 ? 'label' : 'labels'}`}
                </span>
              </Badge>
            )
          ) : (
            <div
              className={cn(
                'outline-none',
                showList
                  ? 'flex h-8 w-48 items-center gap-2 p-1 text-xs font-medium text-foreground hover:rounded-md hover:bg-muted/70'
                  : 'flex w-48 cursor-pointer items-center gap-2 p-1 text-xs hover:rounded-md hover:bg-muted',
                className,
              )}
              onClick={() => setOpen(true)}
            >
              <Tags width={15} />
              {showList && (
                <p className="font-medium text-foreground">Add Label</p>
              )}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align={position.align}
        side={position.side}
      >
        <Command className="w-full text-gray-700">
          <CommandInput
            placeholder="Add labels..."
            autoFocus
            className="text-sm"
          />
          <CommandList className="p-1">
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              {labelList.map((label, index) => (
                <CommandItem
                  className="flex cursor-pointer items-center justify-between px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
                  key={index}
                  onSelect={() => handleLabelToggle(label)}
                >
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={selectedLabels.some(
                        (selectedLabel) => selectedLabel.name === label.name,
                      )}
                      onChange={() => handleLabelToggle(label)}
                    />
                    <div
                      className="rounded-lg p-1.5"
                      style={{ backgroundColor: label.color }}
                    ></div>
                    {label.name}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LabelDropdown;
