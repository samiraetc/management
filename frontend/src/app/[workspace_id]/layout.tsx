'use client';

import { useEffect, useState } from 'react';

import { PanelLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import api from '@/app/api/api';

import { getWorkspaces } from '@/services/Workspace/workspace.services';
import { Button } from '@/components/ui/button';
import MenuSidebar from '@/components/MenuSidebar/MenuSidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Toaster } from '@/components/ui/toaster';
import { getTeams } from '@/services/Teams/teamsService';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shrink, setShrink] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [workspace, setWorkspace] = useState<Workspace>();
  const [workspaceUrl, setWorkspaceUrl] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      api.defaults.headers.common['Authorization'] =
        `Bearer ${session?.user?.token}`;
      setWorkspaceUrl(localStorage.getItem('workspace') ?? '');
    }
  }, [session, status]);

  useEffect(() => {
    if (workspaceUrl) {
      setWorkspaceInRedux();
    }
  }, [workspaceUrl]);

  const setWorkspaceInRedux = async () => {
    try {
      const response = await getWorkspaces();
      const defaultWorkspace = response[0] ?? null;
      const foundWorkspace = response?.find(
        (item: Workspace) => item.url_key === workspaceUrl,
      );

      if (foundWorkspace) {
        dispatch({
          type: 'workspace/setWorkspace',
          payload: foundWorkspace,
        });

        fetchTeams(foundWorkspace.id);
        setWorkspace(foundWorkspace);
      } else if (defaultWorkspace) {
        localStorage.setItem('workspace', defaultWorkspace.url_key);
        dispatch({
          type: 'workspace/setWorkspace',
          payload: defaultWorkspace,
        });

        fetchTeams(defaultWorkspace.id);
        setWorkspace(defaultWorkspace);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeams = async (id: string) => {
    await getTeams(id).then((response) => {
      dispatch({
        type: 'teams/setTeams',
        payload: response,
      });
    });
  };

  return !workspace ? (
    <div>loading...</div>
  ) : (
    <div>
      <Toaster />
      <Transition show={sidebarOpen}>
        <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <TransitionChild
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-foreground/40" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 bg-background">
                <TransitionChild
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <Button
                      variant="ghost"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <X className="size-6 text-white" aria-hidden="true" />
                    </Button>
                  </div>
                </TransitionChild>

                <MenuSidebar />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <div className="sticky top-0 z-40 flex items-center border-b bg-background px-6 py-2 shadow-sm sm:px-6 lg:hidden">
        <Button
          type="button"
          className="-m-2.5 p-2.5 lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          variant="ghost"
        >
          <span className="sr-only">Open sidebar</span>
          <PanelLeft className="size-5" aria-hidden="true" />
        </Button>
      </div>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          minSize={shrink ? 5 : 15}
          maxSize={shrink ? 4.5 : 20}
          className={
            'hidden lg:inset-y-0 lg:z-50 lg:flex lg:h-screen lg:flex-col'
          }
        >
          <MenuSidebar shrink={shrink} setShrink={setShrink} />
        </ResizablePanel>
        <ResizableHandle className="border-none" />
        <ResizablePanel className="flex h-lvh min-w-0 !overflow-visible bg-gray-50 dark:bg-background">
          <main className="relative flex-1 overflow-visible rounded-md border-border bg-background sm:my-2 sm:mr-2 sm:border">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
