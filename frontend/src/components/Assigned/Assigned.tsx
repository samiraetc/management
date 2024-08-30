import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, CircleUserRound } from 'lucide-react';
import useWindowSize from '@/hook/useWindowSize/useWindowSize';
import { updateTaskDetails } from '@/services/Task/taskService';
import { getTeamMembers } from '@/services/Teams/teamsService';
import { Avatar, AvatarImage } from '../ui/avatar';

interface IAssigned {
  assigned: User | null;
  showList?: boolean;
  task?: Task;
  className?: string;
  setProperties?: (value: User | null) => void;
  teamId?: string;
  label?: boolean;
}

const UserList = ({
  member,
  value,
  setValue,
  onClose,
}: {
  member: User[];
  value: User | null;
  setValue: (selected: User | null) => void;
  onClose: () => void;
}) => (
  <>
    <CommandInput
      placeholder="Change assigned..."
      autoFocus={true}
      className="text-sm"
    />

    <CommandList className="p-1">
      <CommandEmpty>No results found.</CommandEmpty>

      <CommandItem
        className="cursor-pointer px-4 py-1.5"
        onSelect={() => {
          setValue(null);
          onClose();
        }}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <CircleUserRound width={22} />

            <p className="text-sm">No assignee</p>
          </div>

          {value === null && <Check width={20} height={20} className="mr-2" />}
        </div>
      </CommandItem>
      {member.map((user, index) => {
        return (
          <CommandItem
            className="cursor-pointer px-4 py-1.5"
            key={index}
            onSelect={() => {
              setValue(user);
              onClose();
            }}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center justify-between gap-4">
                {user.image ? (
                  <Avatar className="size-[1.35rem]">
                    <AvatarImage
                      width={12}
                      height={12}
                      src={user.image as string}
                      alt="Profile"
                      className="flex rounded-full object-cover"
                    />
                  </Avatar>
                ) : (
                  <CircleUserRound width={22} />
                )}

                <p className="text-sm"> {user.full_name}</p>
              </div>

              {value?.id === user.id && (
                <Check width={20} height={20} className="mr-2" />
              )}
            </div>
          </CommandItem>
        );
      })}
    </CommandList>
  </>
);

const Assigned = ({
  assigned,
  className,
  task,
  setProperties,
  teamId,
}: IAssigned) => {
  const [value, setValue] = useState<User | null>(assigned);
  const [open, setOpen] = useState<boolean>(false);
  const [members, setMembers] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const isMobile = useWindowSize();

  useEffect(() => {
    const handleGetWorkspaceUsers = async () => {
      return await getTeamMembers(teamId ?? '').then((response) => {
        setMembers(response);
      });
    };
    handleGetWorkspaceUsers();
  }, []);

  const handleSetValue = async (value: User | null) => {
    setValue(value);
    setProperties
      ? setProperties(value)
      : await updateTaskDetails(task?.id ?? '', {
          assigned: value ? value.id : null,
        });
  };

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          onClick={() => (isMobile ? setOpenDialog(true) : setOpen(true))}
          className={cn(
            'outline-none flex h-8 w-48 items-center text-stone-600 gap-4 p-1 text-xs font-medium text-foreground hover:rounded-md hover:bg-muted/70',
            className,
          )}
        >
          <div className="flex items-center gap-2">
            {value?.id ? (
              <>
                {value.image ? (
                  <Avatar className="size-4">
                    <AvatarImage
                      width={12}
                      height={12}
                      src={value.image as string}
                      alt="Profile"
                      className="flex rounded-full object-cover"
                    />
                  </Avatar>
                ) : (
                  <CircleUserRound width={16} className='text-stone-600' />
                )}
                <p className='text-stone-600'>{value.full_name}</p>
              </>
            ) : (
              <>
                <CircleUserRound width={16} className='text-stone-600' />
                <p className='text-stone-600'>Assigned</p>
              </>
            )}
          </div>
        </DropdownMenuTrigger>

        {!isMobile && (
          <DropdownMenuContent className="w-56" align="center" side="bottom">
            <Command className="w-full text-gray-700">
              <UserList
                member={members}
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
          showClose={false}
          className="top-1/4 w-11/12 -translate-x-1/2 translate-y-[-12%] rounded-md sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2"
        >
          <div className="mb-2 mt-3 px-3">
            <p className="max-w-full truncate rounded-sm border bg-muted p-1 text-xs text-muted-foreground">{`${task?.identifier} - ${task?.title}`}</p>
          </div>
          <UserList
            member={members}
            value={value}
            setValue={handleSetValue}
            onClose={() => setOpenDialog(false)}
          />
        </CommandDialog>
      )}
    </div>
  );
};

export default Assigned;
