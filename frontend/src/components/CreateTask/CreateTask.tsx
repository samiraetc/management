import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Check, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import RichText from '../RichText/RichText';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import CreateTaskProperties from './CreateTaskProperties';

interface ICreateTask {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const CreateTask = ({ open, setOpen }: ICreateTask) => {
  const teams = useSelector((state: RootState) => state.teams.teams) ?? [];

  const [selectedTeam, setSelectedTeam] = useState<Team>(teams[0]);
  const [openTeam, setOpenTeam] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [expandDialog, setExpandDialog] = useState<boolean>(false);

  const handleCloseDialog = () => {
    setTitle('');
    setOpenTeam(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent
        className={cn(
          'w-11/12 -translate-x-1/2 translate-y-[-70%] gap-1 rounded-md p-0 transition-all duration-700 ease-in-out sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2',
          expandDialog
            ? 'left-[53%] top-[45%] max-w-3xl'
            : 'top-[34%] max-w-2xl sm:top-[30%]',
        )}
      >
        <div className="p-3">
          <DialogHeader className="flex justify-between">
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <DropdownMenu open={openTeam} onOpenChange={setOpenTeam}>
                  <DropdownMenuTrigger className="rounded-md border px-3 py-0.5 text-xs font-medium">
                    {selectedTeam?.identifier}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Command className="w-full text-gray-700">
                      <CommandInput
                        placeholder="Change team..."
                        autoFocus
                        className="h-8 text-sm"
                      />

                      <CommandList className="p-1">
                        <CommandEmpty>No results found.</CommandEmpty>

                        {teams.map((team, index) => {
                          return (
                            <CommandItem
                              className="cursor-pointer px-4 py-1.5"
                              key={index}
                              onSelect={() => {
                                setSelectedTeam(team);
                                setOpenTeam(false);
                              }}
                            >
                              <div className="flex w-full items-center justify-between">
                                {team.identifier}
                                {selectedTeam === team && (
                                  <Check width={20} height={20} />
                                )}
                              </div>
                            </CommandItem>
                          );
                        })}
                      </CommandList>
                    </Command>
                  </DropdownMenuContent>
                </DropdownMenu>

                <ChevronRight
                  size={12}
                  strokeWidth={1.25}
                  className="font-light"
                />
                <p className="text-xs font-light">New issue </p>
              </div>

              {expandDialog ? (
                <Minimize2
                  className="hidden sm:mr-8 sm:block sm:cursor-pointer"
                  width={14}
                  onClick={() => setExpandDialog(false)}
                />
              ) : (
                <Maximize2
                  className="hidden sm:mr-8 sm:block sm:cursor-pointer"
                  width={14}
                  onClick={() => setExpandDialog(true)}
                />
              )}
            </div>
          </DialogHeader>

          <div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Issue title"
              className="text-md rounded-none border-none p-0 font-semibold outline-none ring-0 focus-visible:ring-0"
            />
          </div>

          <div
            className={cn(
              'overflow-y-scroll transition-all duration-700 ease-in-out',
              expandDialog
                ? 'max-h-96 min-h-96'
                : 'max-h-32 min-h-32 sm:max-h-56 sm:min-h-24',
            )}
          >
            <RichText onChange={() => console.log('todo')} />
          </div>

          <div className="flex flex-wrap gap-1">
            <CreateTaskProperties />
          </div>
        </div>
        <Separator />
        <DialogFooter className="items-end px-2 pb-2 pt-1">
          <Button className="h-7 text-xs">Create issue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
