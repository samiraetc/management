import React, { useEffect, useState } from 'react';
import withLayout from '@/utils/hoc/withLayout';
import { CircleX, Copy, GitBranchPlus, Link } from 'lucide-react';
import { copyUrlToClipboard, sanitizeBranchName } from '@/utils/clipboard';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/router';
import { TaskPriority } from '@/lib/utils';
import Status from '@/components/Status/Status';
import Priority from '@/components/Priority/Priority';
import Estimative from '@/components/Estimative/Estimative';
import LabelDropdown from '@/components/LabelDropdown/LabelDropdown';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import RichText from '@/components/RichText/RichText';
import CreateTaskProperties from '@/components/CreateTask/CreateTaskProperties';
import useWindowSize from '@/hook/useWindowSize/useWindowSize';
import IssueHeader from '@/components/IssueHeader/IssueHeader';
import DueDate from '@/components/DueDate/DueDate';
import { getTaskDetails, updateTaskDetails } from '@/services/Task/taskService';
import Assigned from '@/components/Assigned/Assigned';

const IssuePage = () => {
  const route = useRouter();
  const issueId = (route.query.issue_identifier as string) ?? '';
  const [title, setTitle] = useState<string>();
  const isMobile = useWindowSize();
  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetTaskDetails = async () => {
    const taskId = localStorage.getItem('task') ?? '';
    await getTaskDetails(taskId)
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

  useEffect(() => {
    handleGetTaskDetails();
  }, []);

  return loading ? (
    <>Loading..</>
  ) : (
    <>
      <div className="flex h-full gap-1 overflow-hidden">
        <div className="w-full">
          <IssueHeader task={task} />
          {isMobile && (
            <div className="sticky top-0 z-50 w-full border-b bg-background">
              <div className="flex flex-wrap gap-2 p-2">
                <CreateTaskProperties teamId={task?.team_id} />
              </div>
            </div>
          )}
          <div className="h-full overflow-x-scroll">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Issue title"
              className="mt-5 border-none pl-8 text-4xl font-semibold outline-none ring-0 focus-visible:ring-0"
              onBlur={() => handleChangeIssueTitle()}
            />

            <div className="mb-12 h-full overflow-scroll">
              <RichText
                content={task?.description}
                onChange={handleChangeDescription}
                className="p-8"
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
            <div className="flex gap-4">
              <Link
                onClick={() => copyUrlToClipboard()}
                size={14}
                className="cursor-pointer"
              />
              <Copy
                onClick={() => copyUrlToClipboard(issueId)}
                size={14}
                className="cursor-pointer"
              />
              <GitBranchPlus
                onClick={() =>
                  copyUrlToClipboard(
                    sanitizeBranchName(`${task?.identifier} ${task?.title}`),
                  )
                }
                size={14}
                className="cursor-pointer"
              />
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
            assignedUser={task?.assigned_to ?? []}
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
          {task?.due_date && (
            <>
              <Separator />
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Due Date
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  <DueDate dueDate={task?.due_date} task={task} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default withLayout(IssuePage);
