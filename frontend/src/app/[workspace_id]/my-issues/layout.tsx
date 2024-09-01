'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { useParams, useRouter } from 'next/navigation';
import { IssueProvider } from '@/context/issueProvider';
import { getAllTasksByUserFilters } from '@/services/Task/taskService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

enum MyTaskFilter {
  Created = 'created',
  Assigned = 'assigned',
}

export default function IssueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [active, setActive] = useState<FilterTaskKey>(
    (params.filter as FilterTaskKey) ?? MyTaskFilter.Created,
  );
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );

  const handleGetAllTasks = async () => {
    await getAllTasksByUserFilters(active, workspace?.id ?? '').then(
      (response) => {
        setTasks(response);
      },
    );
  };

  useEffect(() => {
    handleGetAllTasks();
  }, [active]);

  const handleChangeActiveTab = (value: MyTaskFilter) => {
    setActive(value);
    router.replace(value);
  };

  return (
    <Tabs defaultValue={active}>
      <div className="h-full overflow-hidden">
        <div className="sticky -top-0.5 z-50 flex w-full items-center rounded-t-sm border-b bg-background">
          <p className="py-2 pl-4 text-sm font-medium sm:pl-7 sm:pr-4">
            My issues
          </p>
          <TabsList className="gap-2">
            <TabsTrigger
              value={MyTaskFilter.Created}
              className="h-7 w-24 border p-0 active:bg-black"
              onClick={() => handleChangeActiveTab(MyTaskFilter.Created)}
            >
              Created
            </TabsTrigger>

            <TabsTrigger
              value={MyTaskFilter.Assigned}
              className="h-7 w-24 border p-0"
              onClick={() => handleChangeActiveTab(MyTaskFilter.Assigned)}
            >
              Assigned
            </TabsTrigger>
          </TabsList>
        </div>
        <IssueProvider tasks={tasks}>
          <TabsContent value={MyTaskFilter.Created}>{children}</TabsContent>
          <TabsContent value={MyTaskFilter.Assigned}>{children}</TabsContent>
        </IssueProvider>
      </div>
    </Tabs>
  );
}
