import React, { useState } from 'react';
import withLayout from '@/utils/hoc/withLayout';
import {
  CircleUserRound,
  CircleX,
  Copy,
  GitBranchPlus,
  Link,
} from 'lucide-react';
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
import { issue } from '@/mock/issue';
import RichText from '@/components/RichText/RichText';
import CreateTaskProperties from '@/components/CreateTask/CreateTaskProperties';
import useWindowSize from '@/hook/useWindowSize/useWindowSize';
import IssueHeader from '@/components/IssueHeader/IssueHeader';
import DueDate from '@/components/DueDate/DueDate';

const IssuePage = () => {
  const route = useRouter();
  const issueId = (route.query.issue_identifier as string) ?? '';
  const [title, setTitle] = useState<string>(issue.title);
  const isMobile = useWindowSize();

  const handleChangeIssueTitle = () => {
    if (title) {
      return;
    } else {
      toast({
        icon: <CircleX className="size-5" />,
        title: 'Updated failed',
        variant: 'destructive',
        description: <p>The field must contain at least 1 character.</p>,
      });
      setTitle(issue.title);
    }
  };

  const handleChangeDescription = (value: string) => {
    console.log('todo');
  };

  return (
    <>
      <div className="flex h-full gap-1 overflow-hidden">
        <div className="w-full">
          <IssueHeader issue={issue} />
          {isMobile && (
            <div className="sticky top-0 z-50 w-full border-b bg-background">
              <div className="flex gap-2 p-2 flex-wrap">
                <CreateTaskProperties />
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

            <div className="mb-4">
              <RichText
                content={issue.description}
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
                    sanitizeBranchName(`${issue.identifier} ${issue.title}`),
                  )
                }
                size={14}
                className="cursor-pointer"
              />
            </div>
          </div>

          <Status status={issue.status} task={issue} label />

          <Priority
            priority={issue.priority as TaskPriority}
            task={issue}
            label
          />

          <Estimative estimative={issue.estimative} task={issue} label />

          <div className="flex w-48 items-center gap-2 p-1 text-xs hover:rounded-md hover:bg-muted">
            <CircleUserRound width={15} />
            <p className="font-medium text-foreground">Assigned</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">Labels</p>

            <div className="mt-3 flex flex-wrap gap-1">
              <LabelDropdown labels={issue.labels} />
            </div>
          </div>
          {issue.due_date && (
            <>
              <Separator />
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Due Date
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  <DueDate dueDate={issue.due_date} task={issue} />
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
