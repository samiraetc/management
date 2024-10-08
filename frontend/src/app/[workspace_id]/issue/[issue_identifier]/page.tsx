'use client';

import React, { useEffect, useState } from 'react';
import { CircleX, Copy, GitBranchPlus, Link } from 'lucide-react';
import { copyUrlToClipboard, sanitizeBranchName } from '@/utils/clipboard';
import { Separator } from '@/components/ui/separator';
import { TaskPriority } from '@/lib/utils';
import Status from '@/components/Status/Status';
import Priority from '@/components/Priority/Priority';
import Estimative from '@/components/Estimative/Estimative';
import LabelDropdown from '@/components/LabelDropdown/LabelDropdown';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import IssueHeader from '@/components/IssueHeader/IssueHeader';
import DueDate from '@/components/DueDate/DueDate';
import { getTaskDetails, updateTaskDetails } from '@/services/Task/taskService';
import Assigned from '@/components/Assigned/Assigned';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Toolbar } from '@/components/ui/toolbar';
import Tiptap from '@/components/TipTap/Tiptap';

const IssuePage = () => {
  const params = useParams();
  const [title, setTitle] = useState<string>();
  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState<boolean>(true);
  const taskIdentifier = (params.issue_identifier as string) ?? '';
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );

  const handleGetTaskDetails = async () => {
    await getTaskDetails(taskIdentifier, workspace?.id ?? '')
      .then((response) => {
        setTask(response);
        setTitle(response.title);
      })
      .catch(() =>
        toast({
          icon: <CircleX className="size-5" />,
          title: 'Something is wrong',
          variant: 'destructive',
        }),
      )
      .finally(() => setLoading(false));
  };

  const handleChangeIssueTitle = async () => {
    if (title && task) {
      await updateTaskDetails(task.id, {
        title,
      });
    } else {
      toast({
        icon: <CircleX className="size-5" />,
        title: 'Updated failed',
        variant: 'destructive',
        description: <p>The field must contain at least 1 character.</p>,
      });
      setTitle(task?.title ?? '');
    }
  };

  const handleChangeDescription = async (value: string) => {
    await updateTaskDetails(task?.id ?? '', {
      description: value,
    });
  };

  const handleGetTaskByStorage = (task: Task) => {
    setTask(task);
    setTitle(task.title);
    setLoading(false);
  };

  useEffect(() => {
    const taskStorage = sessionStorage.getItem('task');
    const task = taskStorage ? JSON.parse(taskStorage) : null;
    sessionStorage.removeItem('task');

    task ? handleGetTaskByStorage(task) : handleGetTaskDetails();
  }, []);

  return loading ? null : (
    <>
      <div className="flex h-full gap-1 overflow-hidden">
        <div className="w-full">
          <IssueHeader task={task} />

          <div className="h-full overflow-x-scroll">
            <Input
              data-testid="issue-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Issue title"
              className="mt-5 border-none px-20 py-8 text-2xl font-semibold outline-none ring-0 focus-visible:ring-0"
              onBlur={() => handleChangeIssueTitle()}
            />

            <div className="mb-12 h-full overflow-scroll">
              <Tiptap
                content={task?.description}
                onChange={handleChangeDescription}
                className="px-20"
              />
            </div>
          </div>
        </div>

        <Separator orientation="vertical" />
        <div className="hidden w-80 space-y-3 px-5 py-3 sm:block">
          <div className="flex items-center justify-between">
            <p className="pl-0.5 text-xs font-medium text-muted-foreground">
              Properties
            </p>
            <div className="flex">
              <Toolbar.Button
                tooltip="Copy task URL"
                onClick={() => copyUrlToClipboard()}
              >
                <Link size={14} className="cursor-pointer" />
              </Toolbar.Button>

              <Toolbar.Button
                tooltip="Copy task ID"
                onClick={() => copyUrlToClipboard(task?.identifier)}
              >
                <Copy size={14} className="cursor-pointer" />
              </Toolbar.Button>

              <Toolbar.Button
                tooltip="Copy git branch name"
                onClick={() =>
                  copyUrlToClipboard(
                    sanitizeBranchName(`${task?.identifier} ${task?.title}`),
                  )
                }
              >
                <GitBranchPlus size={14} className="cursor-pointer" />
              </Toolbar.Button>
            </div>
          </div>

          <Status status={task?.status ?? ''} task={task} label />
          <Priority
            priority={task?.priority as TaskPriority}
            task={task}
            label
          />

          <Estimative estimative={task?.estimative ?? ''} task={task} label />

          <Assigned
            assigned={task?.assigned ?? null}
            teamId={task?.team_id}
            task={task}
          />

          <div>
            <p className="text-xs font-medium text-muted-foreground">Labels</p>

            <div className="mt-3 flex flex-wrap gap-1">
              <LabelDropdown
                labels={task?.labels ?? []}
                teamId={task?.team_id}
                task={task}
              />
            </div>
          </div>

          <>
            <Separator />
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Due Date
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                <DueDate dueDate={task?.due_date ?? null} task={task} />
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default IssuePage;
