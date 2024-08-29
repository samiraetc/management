'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RootState } from '@/redux/store';
import {
  createWorkspaceLabel,
  deleteWorkspacelabel,
  editWorkspacelabel,
  getLabels,
} from '@/services/Label/labelService';

import {
  Brush,
  Check,
  CircleAlert,
  Palette,
  Pencil,
  Search,
  Trash,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, labelColors } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { format } from 'date-fns';

function alreadyExist() {
  toast({
    icon: <CircleAlert className="size-5" />,
    title: 'Unable to save label',
    description: (
      <p className="text-gray-500 dark:text-white/70">
        A label with this name already exists in the workspace labels.
      </p>
    ),
  });
}

interface ILabelForm {
  selectedColor: string;
  label: string;
  handleCancelNewLabel: () => void;
  setSelectedColor: (selected: string) => void;
  setLabel: (label: string) => void;
  handleSave: () => void;
}

const LabelForm = ({
  selectedColor,
  handleCancelNewLabel,
  setSelectedColor,
  setLabel,
  label,
  handleSave,
}: ILabelForm) => {
  const [palette, setPalette] = useState<boolean>(false);

  const handleChange = (value: string) => {
    if (!value.startsWith('#')) {
      value = '#' + value.replace('#', '');
    }
    if (value.length <= 7) {
      setSelectedColor(value);
    }
  };

  return (
    <div className="rounded-sm border bg-accent p-1.5 pl-3 dark:bg-white/5">
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger>
            <div className="rounded-sm border bg-background p-[0.6875rem]">
              <div
                className="rounded-lg p-1"
                style={{ backgroundColor: selectedColor }}
              ></div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full p-2 px-4">
            <div>
              <div className="relative flex h-full items-center gap-4">
                {palette ? (
                  <div className="flex w-[19rem] items-center gap-2">
                    <div
                      className={cn(
                        'flex size-6 items-center justify-between rounded-full',
                        selectedColor.length === 1 &&
                          'border border-dashed border-gray-400',
                      )}
                      style={{
                        backgroundColor:
                          selectedColor.length === 1 ? '' : selectedColor,
                      }}
                    >
                      {selectedColor && (
                        <Check
                          className="p-1 text-white"
                          width={25}
                          height={25}
                        />
                      )}
                    </div>

                    <div className="relative w-56">
                      <p className="absolute left-1 top-0 text-gray-400">HEX</p>
                      <Input
                        className="h-6 border-none pl-10 outline-none focus:ring-0 focus-visible:ring-transparent"
                        onChange={(e) => handleChange(e.target.value)}
                        value={selectedColor}
                        maxLength={7}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    {labelColors.map((color) => (
                      <div
                        key={color.name}
                        className={`flex size-6 cursor-pointer items-center justify-between rounded-full`}
                        style={{ backgroundColor: color.color }}
                        onClick={() => setSelectedColor(color.color)}
                      >
                        {selectedColor === color.color && (
                          <Check
                            className="p-1 text-white"
                            width={25}
                            height={25}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <Separator orientation="vertical" className="h-6" />

                <div
                  className={cn(
                    'cursor-pointer rounded-full border p-1 text-gray-500',
                  )}
                  onClick={() => setPalette(!palette)}
                >
                  {palette ? <Palette size={18} /> : <Brush size={18} />}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Input
          className="h-8"
          placeholder="Label name"
          onChange={(e) => setLabel(e.target.value)}
          value={label}
        />
        <Separator orientation="vertical" className="h-8" />
        <Button
          className="h-8 dark:bg-accent dark:hover:bg-accent/60"
          variant="outline"
          onClick={() => handleCancelNewLabel()}
        >
          Cancel
        </Button>
        <Button className="h-8" onClick={() => handleSave()}>
          Save
        </Button>
      </div>
    </div>
  );
};

const WorkspaceLabels = () => {
  const [workspaceLabels, setWorkspaceLabels] = useState<Label[]>([]);
  const [search, setSearch] = useState<string>();
  const [selectedColor, setSelectedColor] = useState(labelColors[0].color);
  const [labelName, setLabelName] = useState<string>('');
  const [newLabel, setNewLabel] = useState<boolean>(false);
  const [labelId, setLabelId] = useState<string>('');
  const hasLabel = workspaceLabels.some((item) => item.name === labelName);

  const workspace =
    useSelector((state: RootState) => state.workspace.workspace) ?? null;

  const getWorkspaceLabels = async () => {
    await getLabels(workspace?.id ?? '').then((res) => setWorkspaceLabels(res));
  };

  const handleCancelNewLabel = () => {
    setNewLabel(false);
    setLabelName('');
    setSelectedColor(labelColors[0].color);
    setLabelId('');
  };

  const handleCreateNewLabel = async () => {
    hasLabel
      ? alreadyExist()
      : await createWorkspaceLabel(workspace?.id ?? '', {
          name: labelName,
          color: selectedColor,
        })
          .then(() => getWorkspaceLabels())
          .finally(() => handleCancelNewLabel());
  };

  const handleEditLabel = async () => {
    const currentLabel = workspaceLabels.find((item) => item.id === labelId);
    const isNameSame = currentLabel?.name === labelName;

    const updateData = isNameSame
      ? { color: selectedColor }
      : { name: labelName, color: selectedColor };

    await editWorkspacelabel(workspace?.id ?? '', labelId, updateData)
      .then(() => getWorkspaceLabels())
      .finally(() => handleCancelNewLabel());
  };

  const handleDeleteWorkspaceLabel = async (id: string) => {
    await deleteWorkspacelabel(workspace?.id ?? '', id).then(() =>
      getWorkspaceLabels(),
    );
  };

  useEffect(() => {
    getWorkspaceLabels();
  }, []);

  return (
    <div className="lg:mt-18 m-4 mx-auto w-[21rem] sm:mt-12 sm:w-[35rem] lg:w-[40rem]">
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="text-3xl font-normal">Workspace Labels</div>
          <div className="text-sm text-black/50 dark:text-white/70">
            Manage your workspace labels
          </div>
          <Separator />
        </div>
        <div className="flex justify-between">
          <div className="relative w-56">
            <Search
              className="absolute left-2.5 top-1 text-gray-400"
              width={16}
            />
            <Input
              className="h-8 pl-8"
              placeholder="Filter by name"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <Button
            className="h-8"
            onClick={() => setNewLabel(true)}
            disabled={newLabel}
          >
            New Label
          </Button>
        </div>
        {newLabel && (
          <LabelForm
            label={labelName}
            setLabel={setLabelName}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            handleCancelNewLabel={handleCancelNewLabel}
            handleSave={handleCreateNewLabel}
          />
        )}
        <div className="space-y-1">
          {workspaceLabels
            .filter((filter) =>
              search
                ? filter.name.toLowerCase().includes(search.toLowerCase())
                : filter.name,
            )
            .map((label) => {
              return (
                <div key={label.id}>
                  {labelId === label.id ? (
                    <LabelForm
                      label={labelName}
                      setLabel={setLabelName}
                      selectedColor={selectedColor}
                      setSelectedColor={setSelectedColor}
                      handleCancelNewLabel={handleCancelNewLabel}
                      handleSave={handleEditLabel}
                    />
                  ) : (
                    <div className="group flex flex-col rounded-sm border bg-white/5 p-1 pl-6 pr-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="rounded-lg p-1"
                            style={{ backgroundColor: label.color }}
                          ></div>
                          <p className="text-sm">{label.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {label.created_at && (
                            <Tooltip delayDuration={10}>
                              <TooltipTrigger>
                                <CircleAlert
                                  width={14}
                                  className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100"
                                />
                              </TooltipTrigger>
                              <TooltipContent className="p-1 text-xs">
                                Created on{' '}
                                {format(new Date(label.created_at), 'MMM d')}
                              </TooltipContent>
                            </Tooltip>
                          )}
                          {label.can_edit && (
                            <Pencil
                              width={14}
                              className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100"
                              onClick={() => {
                                setLabelName(label.name);
                                setSelectedColor(label.color);
                                setLabelId(label.id);
                              }}
                            />
                          )}

                          <Trash
                            width={14}
                            className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100"
                            onClick={() => {
                              handleDeleteWorkspaceLabel(label.id);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceLabels;
