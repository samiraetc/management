import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Building,
  ChevronsLeft,
  ChevronsRight,
  CircleUserRound,
  ListTodo,
  Plus,
  X,
} from 'lucide-react';
import { LuPanelLeft } from 'react-icons/lu';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable';
import MenuSidebar from '../MenuSidebar/MenuSidebar';
import { Accordion } from '../ui/accordion';
import { AccordionItem } from '@radix-ui/react-accordion';
import MenuSidebarButton from '../MenuSidebar/components/MenuSidebarButton';
import { translation } from '@/i18n/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import api from '@/pages/api/api';
import { getWorkspaces } from '@/services/Workspace/workspace.services';
import { getTeams } from '@/services/Teams/teamsService';

interface ISettings {
  children: React.ReactElement;
}

const Settings = ({ children }: ISettings) => {
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

  const [teams, setTeams] = useState<Team[]>();

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
    setLoading(true);
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
    setLoading(false);
  };

  const fetchTeams = async () => {
    await getTeams(workspace?.id ?? '').then((response) => {
      setTeams(response);

      dispatch({
        type: 'teams/setTeams',
        payload: response,
      });
    });
  };

  useEffect(() => {
    fetchTeams();
  }, [workspace]);

  return (
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
                <div className="flex grow flex-col justify-between">
            <div className="flex items-center justify-between px-4">
              {!shrink ? (
                <>
                  <div className="p-4 text-4xl font-bold">i.</div>
                  <ChevronsLeft
                    className="hidden opacity-70 lg:flex"
                    onClick={() => setShrink && setShrink(!shrink)}
                  />
                </>
              ) : (
                <ChevronsRight
                  className="mt-5 hidden w-12 opacity-70 md:flex"
                  onClick={() => setShrink && setShrink(!shrink)}
                />
              )}
            </div>

            <div className="flex flex-1 flex-col px-4">
              {!shrink && (
                <>
                  <Accordion
                    type="single"
                    collapsible
                    className="transition-all"
                  >
                    <AccordionItem value="home" className="border-none">
                      <div className="text-md mb-2 flex w-full items-center gap-2 pl-4 font-normal text-black/60">
                        <Building width={20} height={20} />
                        Workspace
                      </div>

                      <MenuSidebarButton
                        url={`/${workspace?.url_key}/settings`}
                        name="Overview"
                          className="pl-2"
                      />
                    </AccordionItem>

                    {/*<AccordionItem value="home" className="mt-2 border-none">
                      <div className="text-md mb-2 flex w-full items-center gap-2 pl-4 font-semibold">
                        <CircleUserRound width={20} height={20} />
                        Account
                      </div>

                      <MenuSidebarButton
                        url={`/${workspace?.url_key}/settings`}
                        name="Overview"
                        className="ml-7"
                      />
                    </AccordionItem> */}

                    <AccordionItem value="home" className="mt-2 border-none">
                      <div className="text-md mb-2 flex w-24 items-center gap-2 pl-4 font-normal text-black/60">
                        <CircleUserRound width={20} height={20} />
                        Teams
                      </div>

                      <div className="border-none">
                        {teams?.map((team: any) => {
                          return (
                            <MenuSidebarButton
                              key={team.id}
                              url={`/${workspace?.url_key}/team/${team.identifier}`}
                              name={team.name}
                              className="pl-2"
                            />
                          );
                        })}
                      </div>

                      <MenuSidebarButton
                        url={`/${workspace?.url_key}/settings/new-team`}
                        name="Add team"
                        className="pl-2"
                        icon={<Plus width={20} height={20} />}
                      />
                    </AccordionItem>
                  </Accordion>
                </>
              )}
            </div>
          </div>
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
          <div className="flex grow flex-col justify-between">
            <div className="flex items-center justify-between px-4">
              {!shrink ? (
                <>
                  <div className="p-4 text-4xl font-bold">i.</div>
                  <ChevronsLeft
                    className="hidden opacity-70 lg:flex"
                    onClick={() => setShrink && setShrink(!shrink)}
                  />
                </>
              ) : (
                <ChevronsRight
                  className="mt-5 hidden w-12 opacity-70 md:flex"
                  onClick={() => setShrink && setShrink(!shrink)}
                />
              )}
            </div>

            <div className="flex flex-1 flex-col px-4">
              {!shrink && (
                <>
                  <Accordion
                    type="single"
                    collapsible
                    className="transition-all"
                  >
                    <AccordionItem value="home" className="border-none">
                      <div className="text-md mb-2 flex w-full items-center gap-2 pl-4 font-normal text-black/60">
                        <Building width={20} height={20} />
                        Workspace
                      </div>

                      <MenuSidebarButton
                        url={`/${workspace?.url_key}/settings`}
                        name="Overview"
                          className="pl-2"
                      />
                    </AccordionItem>

                    {/*<AccordionItem value="home" className="mt-2 border-none">
                      <div className="text-md mb-2 flex w-full items-center gap-2 pl-4 font-semibold">
                        <CircleUserRound width={20} height={20} />
                        Account
                      </div>

                      <MenuSidebarButton
                        url={`/${workspace?.url_key}/settings`}
                        name="Overview"
                        className="ml-7"
                      />
                    </AccordionItem> */}

                    <AccordionItem value="home" className="mt-2 border-none">
                      <div className="text-md mb-2 flex w-24 items-center gap-2 pl-4 font-normal text-black/60">
                        <CircleUserRound width={20} height={20} />
                        Teams
                      </div>

                      <div className="border-none">
                        {teams?.map((team: any) => {
                          return (
                            <MenuSidebarButton
                              key={team.id}
                              url={`/${workspace?.url_key}/team/${team.identifier}`}
                              name={team.name}
                              className="pl-2"
                            />
                          );
                        })}
                      </div>

                      <MenuSidebarButton
                        url={`/${workspace?.url_key}/settings/new-team`}
                        name="Add team"
                        className="pl-2"
                        icon={<Plus width={20} height={20} />}
                      />
                    </AccordionItem>
                  </Accordion>
                </>
              )}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle className="border-none" />
        <ResizablePanel className="flex h-lvh min-w-0">
          <main className="relative flex-1 overflow-auto rounded-md sm:border border-gray-200 bg-background sm:my-2 sm:mr-2">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Settings;
