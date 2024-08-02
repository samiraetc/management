import React from 'react';
import { generateHexaColor } from '@/utils/colors';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MembersListProps {
  members: User[];
}

const MembersList = ({ members }: MembersListProps) => {
  const maxMembersToShow = 4;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="ml-3 flex items-center">
          {members.slice(0, maxMembersToShow).map((member: User) => (
            <div key={member.id}>
              <span
                className="fist:ml-0 -ml-3 flex size-6 items-center justify-center rounded-full border-2 border-white dark:border-background p-0.5 text-xs text-white"
                style={{
                  backgroundColor: generateHexaColor(),
                }}
              >
                {`${member.first_name.charAt(0)}${member.last_name.charAt(0)}`}
              </span>
            </div>
          ))}
        </TooltipTrigger>
        <TooltipContent sideOffset={6} className="p-2">
          {members.map((mem: User, index: number) => (
            <div
              key={index}
              className="flex w-full items-center gap-1 rounded-md p-2 py-1 text-sm font-normal text-stone-700 hover:bg-accent dark:text-white"
            >
              <span
                className="fist:ml-0 flex size-6 items-center justify-center rounded-full border-2 border-white dark:border-background p-0.5 text-xs text-white"
                style={{
                  backgroundColor: generateHexaColor(),
                }}
              >
                {`${mem.first_name.charAt(0)}${mem.last_name.charAt(0)}`}
              </span>
              <span className="font-semibold">{mem.full_name}</span>
              <span className="text-gray-500"> ({mem.email})</span>
            </div>
          ))}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MembersList;
