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
import { getLabels } from '@/services/Label/labelService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface Label {
  name: string;
  color: string;
}

interface LabelDropdownProps {
  labels: Label[];
}

const LabelDropdown = ({ labels }: LabelDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedLabels, setSelectedLabels] = useState<Label[]>(labels);
  const [labelList, setLabelList] = useState<Label[]>([]);
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );

  const handleLabelToggle = (label: Label) => {
    const isSelected = selectedLabels.some(
      (selectedLabel) => selectedLabel.name === label.name,
    );

    if (isSelected) {
      setSelectedLabels(selectedLabels.filter((l) => l.name !== label.name));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  const handleGetWorkspaceLabels = async () => {
    await getLabels(workspace?.id ?? '').then((response) => {
      setLabelList(response);
    });
  };

  useEffect(() => {
    handleGetWorkspaceLabels();
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex flex-wrap items-center gap-2">
          {selectedLabels.length ? (
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
            <div
              className="flex w-48 cursor-pointer items-center gap-2 p-1 text-xs hover:rounded-md hover:bg-muted"
              onClick={() => setOpen(true)}
            >
              <Tags width={15} />
              <p className="font-medium text-foreground">Add Label</p>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" side="left">
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
