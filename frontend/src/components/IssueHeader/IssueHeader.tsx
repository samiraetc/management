import React, { useState } from 'react';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CalendarDays,
  ChevronRight,
  ClipboardPen,
  Copy,
  Ellipsis,
  GitBranchPlus,
  Link2,
  // Trash,
} from 'lucide-react';
import { copyUrlToClipboard, sanitizeBranchName } from '@/utils/clipboard';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import DueDate from '../DueDate/DueDate';

interface IIssueHeader {
  task?: Task;
}

const DropdownMenuItemComponent = ({
  onClick,
  icon: Icon,
  text,
}: {
  onClick: () => void;
  icon: React.ElementType;
  text: string;
}) => (
  <DropdownMenuItem className="cursor-pointer" onClick={onClick}>
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-1">
        <Icon width={14} />
        <p>{text}</p>
      </div>
    </div>
  </DropdownMenuItem>
);

const IssueHeader = ({ task }: IIssueHeader) => {
  const teams = useSelector((state: RootState) => state.teams.teams) ?? [];
  const [openDueDate, setOpenDueDate] = useState<boolean>(false);

  const handleCopy = (text?: string) => () => copyUrlToClipboard(text);

  return (
    <div className="sticky -top-0.5 z-50 w-full rounded-tl-md border-b bg-background">
      <div className="flex items-center justify-between py-2 pl-6 font-medium sm:pl-6 sm:pr-4">
        <div className="flex items-center gap-1">
          <span className="text-xs">{teams[0]?.name}</span>
          <ChevronRight size={12} strokeWidth={1.25} className="font-light" />
          <span className="text-xs">{task?.identifier}</span>

          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Ellipsis
                width={24}
                height={24}
                className="ml-2 rounded-md p-1 hover:bg-muted"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuItemComponent
                icon={CalendarDays}
                text={task?.due_date ? 'Change due date...' : 'Set due date...'}
                onClick={() => setOpenDueDate(true)}
              />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Copy width={14} />
                      <p>Copy</p>
                    </div>
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent sideOffset={5}>
                    <DropdownMenuItemComponent
                      icon={Copy}
                      text="Copy ID"
                      onClick={handleCopy(task?.identifier)}
                    />
                    <DropdownMenuItemComponent
                      icon={ClipboardPen}
                      text="Copy title"
                      onClick={handleCopy(task?.title)}
                    />
                    <DropdownMenuItemComponent
                      icon={ClipboardPen}
                      text="Copy title as link"
                      onClick={handleCopy(
                        `[${task?.identifier}: ${task?.title}](${window.location.href})`,
                      )}
                    />
                    <DropdownMenuItemComponent
                      icon={Link2}
                      text="Copy link"
                      onClick={handleCopy()}
                    />
                    <DropdownMenuSeparator />
                    <DropdownMenuItemComponent
                      icon={GitBranchPlus}
                      text="Copy git branch name"
                      onClick={() =>
                        copyUrlToClipboard(
                          sanitizeBranchName(
                            `${task?.identifier} ${task?.title}`,
                          ),
                          'Branch name copied to clipboard. Paste it into your favorite git client',
                        )
                      }
                    />
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {/* <DropdownMenuItemComponent
                icon={Trash}
                text="Delete"
                onClick={() => {}}
              /> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {openDueDate && (
        <DueDate
          task={task}
          open={openDueDate}
          setOpen={setOpenDueDate}
          dueDate={task?.due_date}
          dialog={true}
        />
      )}
    </div>
  );
};

export default IssueHeader;
