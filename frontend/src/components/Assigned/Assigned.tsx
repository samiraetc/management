import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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

const AssignedItem = ({
  members,
  value,
  setValue,
  onClose,
}: {
  members: User[];
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
      {members.map((member, index) => {
        return (
          <CommandItem
            className="cursor-pointer px-4 py-1.5"
            key={index}
            onSelect={() => {
              setValue(member);
              onClose();
            }}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center justify-between gap-4">
                {member.image ? (
                  <Avatar className="size-[1.35rem]">
                    <AvatarImage
                      width={12}
                      height={12}
                      src={member.image as string}
                      alt="profile icon"
                      className="flex rounded-full object-cover"
                    />
                  </Avatar>
                ) : (
                  <CircleUserRound width={22} />
                )}

                <p className="text-sm">{member.full_name}</p>
              </div>

              {value?.id === member.id && (
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
  const [currentAssigned, setCurrentAssigned] = useState<User | null>(assigned);
  const [openPopover, setPopoverOpen] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const isMobile = useWindowSize();

  const getAllTeamMembers = async () => {
    if (!openDialog && !openPopover) {
      return await getTeamMembers(teamId ?? '')
        .then((response) => {
          setTeamMembers(response);
        })
        .finally(() => (isMobile ? setOpenDialog(true) : setPopoverOpen(true)));
    } else {
      isMobile ? setOpenDialog(!openDialog) : setPopoverOpen(!open);
    }
  };

  const handleSetValue = async (value: User | null) => {
    setCurrentAssigned(value);
    setProperties
      ? setProperties(value ?? assigned)
      : await updateTaskDetails(task?.id ?? '', {
          assigned: value ? value.id : null,
        });
  };

  return (
    <div>
      <Popover open={openPopover} onOpenChange={setPopoverOpen}>
        <PopoverTrigger
          onClick={() => getAllTeamMembers()}
          className={cn(
            'flex h-8 w-48 items-center gap-4 p-1 text-xs font-medium text-foreground text-stone-600 outline-none hover:rounded-md hover:bg-muted/70',
            className,
          )}
        >
          <div className="flex items-center gap-2">
            {currentAssigned?.id ? (
              <>
                {currentAssigned.image ? (
                  <Avatar className="size-4">
                    <AvatarImage
                      width={12}
                      height={12}
                      src={currentAssigned.image as string}
                      alt="Profile"
                      className="flex rounded-full object-cover"
                    />
                  </Avatar>
                ) : (
                  <CircleUserRound width={16} className="text-stone-600 dark:text-white" />
                )}
                <p className="text-stone-600 dark:text-white">{currentAssigned.full_name}</p>
              </>
            ) : (
              <>
                <CircleUserRound width={16} className="text-stone-600 dark:text-white" />
                <p className="text-stone-600 dark:text-white">Assigned</p>
              </>
            )}
          </div>
        </PopoverTrigger>

        {!isMobile && (
          <PopoverContent className="w-56 p-1" align="center" side="bottom">
            <Command className="w-full text-gray-700">
              <AssignedItem
                members={teamMembers}
                value={currentAssigned}
                setValue={handleSetValue}
                onClose={() => setPopoverOpen(false)}
              />
            </Command>
          </PopoverContent>
        )}
      </Popover>

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
          <AssignedItem
            members={teamMembers}
            value={currentAssigned}
            setValue={handleSetValue}
            onClose={() => setOpenDialog(false)}
          />
        </CommandDialog>
      )}
    </div>
  );
};

export default Assigned;
