'use client';

import { ReactNode, useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
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
import { IUseWorkspaceData } from '@/hook/useWorkspace/types';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [loading, setLoading] = useState(true);
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
    if (
      (session === null || session === undefined) &&
      status == 'unauthenticated'
    ) {
      router.push('/login');
    }

    if (session && status === 'authenticated') {
      setWorkspaceInRedux();
      setLoading(false);
    }
  }, [session, status, workspaceUrl]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWorkspaceUrl(localStorage.getItem('workspace') ?? '');
    }
  }, []);

  const setWorkspaceInRedux = async () => {
    const works = await api
      .get(`/workspaces`, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        params: { user_id: session?.user.id },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return [];
      });

    const defaultWorkspace = works.data?.[0] ?? [];
    const foundWorkspace = works.data?.find(
      (item: IUseWorkspaceData) => item.url_key === workspaceUrl,
    );

    if (workspaceUrl && foundWorkspace) {
      dispatch({
        type: 'workspace/setWorkspace',
        payload: foundWorkspace,
      });
    } else {
      localStorage.setItem('workspace', defaultWorkspace.url_key);
      dispatch({
        type: 'workspace/setWorkspace',
        payload: defaultWorkspace,
      });
    }
  };

  return i18next.isInitialized && !loading && session && workspace ? (
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

      <div
        className={`hidden md:w-72 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col ${shrink ? 'lg:w-16' : ''}`}
      >
        <MenuSidebar
          shrink={shrink}
          setShrink={setShrink}
          workspace={workspace}
        />
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 p-4 shadow-sm sm:px-6 lg:hidden">
        <Button
          type="button"
          className="-m-2.5 p-2.5 lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          variant="ghost"
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="size-6" aria-hidden="true" />
        </Button>
      </div>

      <main
        className={`${shrink ? 'py-6 lg:pl-12' : 'py-6 lg:pl-72'} transition-all duration-150`}
      >
        <div className="px-4 sm:px-6">{children}</div>
      </main>
    </div>
  ) : (
    <div className="px-4 sm:px-6">{children}</div>
  );
};

export default Layout;
