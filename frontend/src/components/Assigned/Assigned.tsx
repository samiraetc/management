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
import { CircleUserRound } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { cn } from '@/lib/utils';
import { getTeamMembers } from '@/services/Teams/teamsService';
import { postAssignedTask } from '@/services/Task/taskService';
import { Avatar, AvatarImage } from '../ui/avatar';

interface AssignedProps {
  assignedUser: TaskAssigned[];
  showList?: boolean;
  task?: Task;
  className?: string;
  position?: {
    align: 'start' | 'center' | 'end' | undefined;
    side: 'left' | 'top' | 'right' | 'bottom' | undefined;
  };
  setProperties?: (value: TaskAssigned[]) => void;
  teamId?: string;
}

const Assigned = ({
  assignedUser,
  showList = true,
  className,
  position = {
    align: 'start',
    side: 'left',
  },
  setProperties,
  teamId,
  task,
}: AssignedProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [assigned, setAssigned] = useState<TaskAssigned[]>(assignedUser);
  const [assignedUsers, setAssignedUsers] = useState<TaskAssigned[]>([]);

  const handleUserToggle = (user: TaskAssigned) => {
    const isSelected = assigned.some(
      (selectedUser) => selectedUser.id === user.id,
    );

    if (isSelected) {
      const selected = assigned.filter((u) => u.id !== user.id);
      setAssigned(selected);
    } else {
      setAssigned([...assigned, ...assignedUsers]);
    }
  };

  const handleGetWorkspaceUsers = async () => {
    return await getTeamMembers(teamId ?? '').then((response) => {
      setAssignedUsers(response);
    });
  };

  useEffect(() => {
    handleGetWorkspaceUsers();
  }, []);

  const handleSetValue = async (value: TaskAssigned[]) => {
    setProperties
      ? setProperties(value)
      : await postAssignedTask(task?.id ?? '', {
          user_ids: value.map((task) => task.id),
        });
  };

  useEffect(() => {
    handleSetValue(assigned);
  }, [assigned]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex flex-wrap items-center gap-2">
          {assigned.length ? (
            showList ? (
              <>
                {assigned.map((user, index) => (
                  <div
                    key={index}
                    className={cn(
                      'outline-none',
                      'flex w-48 cursor-pointer items-center gap-2 p-1 text-xs hover:rounded-md hover:bg-muted',
                    )}
                    onClick={() => setOpen(!open)}
                  >
                    <div className="size-6">
                      {user.image ? (
                        <Avatar>
                          <AvatarImage
                            src={user.image as string}
                            alt="Profile"
                            className="flex size-full rounded-full object-cover"
                          />
                        </Avatar>
                      ) : (
                        <CircleUserRound width={16} />
                      )}
                    </div>
                    {user.full_name}
                  </div>
                ))}
              </>
            ) : (
              <Badge
                variant="outline"
                className="flex h-7 items-center rounded-md p-1 px-3 text-sm font-normal text-stone-600 dark:text-white"
              >
                <div className="flex">
                  {assigned.slice(0, 2 + 3).map((user, index: number) => (
                    <div
                      key={index}
                      className="-ml-1.5 size-2.5 rounded-full border border-white"
                    >
                      <div className="size-6">
                        {user.image ? (
                          <Avatar>
                            <AvatarImage
                              src={user.image as string}
                              alt="Profile"
                              className="flex size-full rounded-full object-cover"
                            />
                          </Avatar>
                        ) : (
                          <CircleUserRound width={16} />
                        )}
                      </div>
                      {user.full_name}
                    </div>
                  ))}
                </div>
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
              <CircleUserRound width={16} />
              {showList && (
                <p className="font-medium text-foreground">Assign</p>
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
            placeholder="Add user..."
            autoFocus
            className="text-sm"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              {assignedUsers.map((user, index) => (
                <CommandItem
                  className="cursor-pointer px-4 py-1.5"
                  key={index}
                  onSelect={() => handleUserToggle(user)}
                >
                  <div className="flex items-center gap-4">
                    <Checkbox
                      className="border-none data-[state=checked]:bg-transparent data-[state=checked]:text-black"
                      checked={assigned.some(
                        (selectedLabel) => selectedLabel.id === user.id,
                      )}
                      onChange={() => handleUserToggle(user)}
                    />

                    <div className="size-6">
                      {user.image ? (
                        <Avatar>
                          <AvatarImage
                            src={user.image as string}
                            alt="Profile"
                            className="flex size-full rounded-full object-cover"
                          />
                        </Avatar>
                      ) : (
                        <CircleUserRound width={20} />
                      )}
                    </div>
                    {user.full_name}
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

export default Assigned;
