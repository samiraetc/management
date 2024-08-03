'use client';

import { ReactNode, useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import MenuSidebar from '../MenuSidebar/MenuSidebar';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import api from '@/pages/api/api';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable';
import { LuPanelLeft } from 'react-icons/lu';
import { getWorkspaces } from '@/services/Workspace/workspace.services';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shrink, setShrink] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );
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
      } else if (defaultWorkspace) {
        localStorage.setItem('workspace', defaultWorkspace.url_key);
        dispatch({
          type: 'workspace/setWorkspace',
          payload: defaultWorkspace,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return i18next.isInitialized && workspace ? (
    <div>
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

                <MenuSidebar workspace={workspace} />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <div className="sticky top-0 z-40 flex items-center border-b px-6 py-2 shadow-sm sm:px-6 lg:hidden">
        <Button
          type="button"
          className="-m-2.5 p-2.5 lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          variant="ghost"
        >
          <span className="sr-only">Open sidebar</span>
          <LuPanelLeft className="size-5" aria-hidden="true" />
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
          <MenuSidebar
            shrink={shrink}
            setShrink={setShrink}
            workspace={workspace}
          />
        </ResizablePanel>
        <ResizableHandle className="border-none" />
        <ResizablePanel className="flex h-lvh min-w-0">
          <main className="relative flex-1 overflow-auto rounded-md border-border bg-background sm:my-2 sm:mr-2 sm:border">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ) : (
    <></>
  );
};

export default Layout;
