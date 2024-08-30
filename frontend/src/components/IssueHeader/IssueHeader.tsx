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
  ChevronRight,
  ClipboardPen,
  Copy,
  Ellipsis,
  GitBranchPlus,
  Link2,
} from 'lucide-react';
import { copyUrlToClipboard, sanitizeBranchName } from '@/utils/clipboard';
import Status from '@/components/Status/Status';
import Priority from '@/components/Priority/Priority';
import Estimative from '@/components/Estimative/Estimative';
import LabelDropdown from '@/components/LabelDropdown/LabelDropdown';
import useWindowSize from '@/hook/useWindowSize/useWindowSize';
import { TaskPriority } from '@/lib/utils';
import DueDate from '../DueDate/DueDate';
import Assigned from '../Assigned/Assigned';

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
  const [openDueDate, setOpenDueDate] = useState<boolean>(false);
  const handleCopy = (text?: string) => () => copyUrlToClipboard(text);
  const isMobile = useWindowSize();

  return (
    <div>
      <div className="sticky -top-0.5 z-50 w-full rounded-tl-md border-b bg-background">
        <div className="flex items-center justify-between py-2 pl-6 font-medium sm:pl-6 sm:pr-4">
          <div className="flex items-center gap-1">
            <span className="text-xs text-stone-600">{task?.team?.name}</span>
            <ChevronRight size={12} strokeWidth={1.25} className="font-light text-stone-600" />
            <span className="text-xs text-stone-600">{task?.identifier}</span>

            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Ellipsis
                  width={24}
                  height={24}
                  className="ml-2 rounded-md p-1 hover:bg-muted text-stone-600"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {isMobile && (
        <div className="sticky top-0 z-50 w-full border-b bg-background">
          <div className="flex flex-wrap gap-2 p-2">
            <Status
              status={task?.status ?? 'backlog'}
              label
              className="h-7 w-full rounded-md border px-3 font-normal"
              task={task}
            />

            <Priority
              priority={task?.priority as TaskPriority}
              className="h-7 w-full rounded-md border px-3 font-normal"
              task={task}
              label
            />
            <Estimative
              estimative={task?.estimative ?? null}
              className="flex h-7 w-full items-center rounded-md border px-3 font-normal"
              task={task}
            />
            <LabelDropdown
              labels={task?.labels ?? []}
              showList={false}
              position={{
                align: 'center',
                side: 'bottom',
              }}
              className="flex h-7 w-full items-center rounded-md border px-3 font-normal"
              teamId={task?.team_id}
              task={task}
            />
            <DueDate
              dialog
              dueDate={task?.due_date}
              className="flex h-7 w-full items-center rounded-md border px-3 font-normal"
              open={openDueDate}
              setOpen={setOpenDueDate}
              task={task}
            />
            <Assigned
              assigned={task?.assigned ?? null}
              teamId={task?.team_id}
              className="flex h-7 w-full items-center rounded-md border px-3 font-normal"
              task={task}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueHeader;
