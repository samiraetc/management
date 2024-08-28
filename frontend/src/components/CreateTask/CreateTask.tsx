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
import {
  Check,
  ChevronRight,
  CircleCheck,
  CircleX,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import CreateTaskProperties from './CreateTaskProperties';
import { postTask } from '@/services/Task/taskService';
import { toast } from '../ui/use-toast';
import Link from 'next/link';
import Tiptap from '../Tiptap';

interface ICreateTask {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export type Properties = {
  status: string | null;
  estimative: string | null;
  priority: string | null;
  labels: Label[];
};
const CreateTask = ({ open, setOpen }: ICreateTask) => {
  const teams = useSelector((state: RootState) => state.teams.teams) ?? [];
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );

  const [selectedTeam, setSelectedTeam] = useState<Team>(teams[0]);
  const [openTeam, setOpenTeam] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [expandDialog, setExpandDialog] = useState<boolean>(false);
  const [properties, setProperties] = useState<Properties>();
  const [description, setDescription] = useState<string>('');

  const handleCloseDialog = () => {
    setTitle('');
    setOpenTeam(false);
    setOpen(false);
  };

  const handleCreateTask = async () => {
    if (title) {
      const body = {
        title,
        description,
        ...properties,
      };

      await postTask(selectedTeam.id, body).then((response) => {
        handleCloseDialog();
        toast({
          icon: <CircleCheck className="size-5 text-green-700" />,
          title: 'Issue created',
          variant: 'default',
          description: (
            <div className="space-y-5">
              <p>{`${response.identifier} — ${response.title}`}</p>
              <Link
                href={`${workspace?.url_key}/issue/${response.identifier}`}
                className="text-blue-500"
              >
                View issue
              </Link>
            </div>
          ),
        });
      });
    } else {
      toast({
        icon: <CircleX className="size-5" />,
        title: 'Created failed',
        variant: 'destructive',
        description: <p>The title must contain at least 1 character.</p>,
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent
        className={cn(
          'w-11/12 -translate-x-1/2 translate-y-[-70%] gap-1 rounded-md p-0 transition-all duration-700 ease-in-out sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2',
          expandDialog
            ? 'left-[53%] top-[45%] max-w-3xl'
            : 'top-[38%] max-w-2xl sm:top-[30%]',
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
            autoFocus
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
            <Tiptap onChange={setDescription} autoFocus={false} />
          </div>

          <div className="flex flex-wrap gap-1">
            <CreateTaskProperties
              setProperties={setProperties}
              teamId={selectedTeam?.id}
            />
          </div>
        </div>
        <Separator />
        <DialogFooter className="items-end px-2 pb-2 pt-1">
          <Button className="h-7 text-xs" onClick={() => handleCreateTask()}>
            Create issue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
