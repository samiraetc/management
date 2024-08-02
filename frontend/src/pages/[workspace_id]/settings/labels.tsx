import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RootState } from '@/redux/store';
import { createWorkspaceLabel, getLabels } from '@/services/Label/labelService';

import withSettings from '@/utils/hoc/withSettings';
import { Check, Palette, Search } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { PiWarningCircleFill } from 'react-icons/pi';

const colors = [
  { color: '#6e6e6e', name: 'gray' },
  { color: '#747F8D', name: 'slate' },
  { color: '#62b7d9', name: 'blue' },
  { color: '#6664e0', name: 'blurple' },
  { color: '#45936c', name: 'green' },
  { color: '#FAA61A', name: 'yellow' },
  { color: '#ff985e', name: 'orange' },
  { color: '#F04747', name: 'red' },
];

const index = () => {
  const router = useRouter();
  const [labels, setLabels] = useState<Label[]>([]);
  const [search, setSearch] = useState<string>();
  const [selectedColor, setSelectedColor] = useState(colors[0].color);
  const [palette, setPalette] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#747F8D');
  const [label, setLabel] = useState<string>('');
  const [newLabel, setNewLabel] = useState<boolean>(false);
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );

  const getWorkspaceLabels = async () => {
    await getLabels(workspace?.id ?? '').then((res) => setLabels(res));
  };

  useEffect(() => {
    getWorkspaceLabels();
  }, []);

  const handleChange = (value: string) => {
    if (!value.startsWith('#')) {
      value = '#' + value.replace('#', '');
    }
    if (value.length <= 7) {
      setColor(value);
      setSelectedColor(value);
    }
  };

  const handleCancelNewLabel = () => {
    setNewLabel(false);
    setLabel('');
    setSelectedColor(colors[0].color);
    setPalette(false);
    setColor(colors[0].color);
  };

  const handleCreateNewLabel = async () => {
    const hasLabel = labels.some((item) => item.name === label);

    if (hasLabel) {
      toast({
        icon: <PiWarningCircleFill className="size-5" />,
        title: 'Unable to save label',
        description: (
          <p className="text-gray-500 dark:text-white/70">
            A label with this name already exists in the workspace labels.
          </p>
        ),
      });
    } else {
      await createWorkspaceLabel(workspace?.id ?? '', {
        name: label,
        color: selectedColor,
      })
        .then((response: Label) =>
          setLabels((prevItems) => [...prevItems, response]),
        )
        .finally(() => handleCancelNewLabel());
    }
  };

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
                  <div className="">
                    <div className="relative flex h-full items-center gap-4">
                      {palette ? (
                        <div className="flex w-[19rem] items-center gap-2">
                          <div
                            className={cn(
                              'flex size-6 cursor-pointer items-center justify-between rounded-full',
                              color.length === 1 &&
                                'border border-dashed border-gray-400',
                            )}
                            style={{
                              backgroundColor: color.length === 1 ? '' : color,
                            }}
                          >
                            {selectedColor === color && (
                              <Check
                                className="p-1 text-white"
                                width={25}
                                height={25}
                              />
                            )}
                          </div>

                          <div className="relative w-56">
                            <p className="absolute left-1 top-0 text-gray-400">
                              HEX
                            </p>
                            <Input
                              className="h-6 border-none pl-10 outline-none focus:ring-0 focus-visible:ring-transparent"
                              onChange={(e) => handleChange(e.target.value)}
                              value={color}
                              maxLength={7}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4">
                          {colors.map((color) => (
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
                          'cursor-pointer border px-2 text-gray-500',
                          palette ? 'rounded-full' : 'rounded-lg',
                        )}
                        onClick={() => setPalette(!palette)}
                      >
                        {palette ? <p>P</p> : <p>#</p>}
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
              <Button className="h-8" onClick={() => handleCreateNewLabel()}>
                Save
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-1">
          {labels
            .filter((filter) =>
              search ? filter.name.includes(search) : filter.name,
            )
            .map((label) => {
              return (
                <div className="rounded-sm border bg-white/5 p-1.5 pl-6">
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-lg p-1"
                      style={{ backgroundColor: label.color }}
                    ></div>
                    <p className="text-sm">{label.name}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default withSettings(index);
