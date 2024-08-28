'use client';

import { useEffect, useState } from 'react';

import {
  ArrowLeft,
  Building,
  CircleUserRound,
  PanelLeft,
  Plus,
  Users,
  X,
} from 'lucide-react';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  settingsTeamsNavigation,
  settingsWorkspaceNavigation,
} from '@/components/MenuSidebar/components/ConfigsDropdown/navigation';
import MenuSidebarButton from '@/components/MenuSidebar/components/MenuSidebarButton';
import { cn } from '@/lib/utils';
import { getTeams } from '@/services/Teams/teamsService';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [workspace, setWorkspace] = useState<Workspace>();
  const [workspaceUrl, setWorkspaceUrl] = useState('');
  const [teams, setTeams] = useState<Team[]>();
  const [loading, setLoading] = useState<boolean>(false);

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
      setLoading(true);
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

        setWorkspace(foundWorkspace);

        fetchTeams(foundWorkspace.id);
      } else if (defaultWorkspace) {
        localStorage.setItem('workspace', defaultWorkspace.url_key);
        dispatch({
          type: 'workspace/setWorkspace',
          payload: defaultWorkspace,
        });

        setWorkspace(defaultWorkspace);
        fetchTeams(defaultWorkspace.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeams = async (id: string) => {
    await getTeams(id)
      .then((response) => {
        setTeams(response);

        dispatch({
          type: 'teams/setTeams',
          payload: response,
        });
      })
      .finally(() => setLoading(false));
  };
  return !teams ? (
    <div>loading...</div>
  ) :  (
    <html lang="en">
      <body>
        <div>
          <Transition show={sidebarOpen}>
            <Dialog
              className="relative z-50 lg:hidden"
              onClose={setSidebarOpen}
            >
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
                      <div className="mt-4 flex flex-1 flex-col px-4">
                        <>
                          <Accordion
                            type="single"
                            collapsible
                            className="flex flex-col justify-start transition-all"
                          >
                            <AccordionItem value="home" className="border-none">
                              <div className="text-md mb-1 flex w-full items-center justify-start gap-3 text-black/70">
                                <div>
                                  <Building width={18} height={18} />
                                </div>
                                <p className="truncate">Workspace</p>
                              </div>

                              {settingsWorkspaceNavigation.map((item) => {
                                return (
                                  <div className="pl-7" key={item.name}>
                                    <MenuSidebarButton
                                      url={`/${workspace?.url_key}/settings/${item.url}`}
                                      name={item.name}
                                      className="pl-1"
                                    />
                                  </div>
                                );
                              })}
                            </AccordionItem>

                            <AccordionItem
                              value="home"
                              className="mt-2 border-none"
                            >
                              <div className="text-md mb-1 flex w-full items-center justify-start gap-3 text-black/70">
                                <CircleUserRound width={18} height={18} />
                                Teams
                              </div>

                              <div className="pl-7">
                                {teams?.map((team, index) => {
                                  return (
                                    <Accordion
                                      key={index}
                                      type="single"
                                      defaultValue="teams"
                                      collapsible
                                    >
                                      <AccordionItem
                                        value="teams"
                                        className="border-none"
                                      >
                                        <AccordionTrigger className="m-0 p-0">
                                          <MenuSidebarButton
                                            key={team.id}
                                            name={team.name}
                                            className="pl-1"
                                          />
                                        </AccordionTrigger>
                                        <AccordionContent className="border-none">
                                          {settingsWorkspaceNavigation.map(
                                            (item) => {
                                              return (
                                                <div
                                                  className="pl-4"
                                                  key={item.name}
                                                >
                                                  <MenuSidebarButton
                                                    url={`/${workspace?.url_key}/settings/teams/${team.identifier}/${item.url}`}
                                                    name={item.name}
                                                    className="pl-1"
                                                  />
                                                </div>
                                              );
                                            },
                                          )}
                                        </AccordionContent>
                                      </AccordionItem>
                                    </Accordion>
                                  );
                                })}
                              </div>
                              <div className="pl-7 text-gray-600">
                                <MenuSidebarButton
                                  url={`/${workspace?.url_key}/settings/new-team`}
                                  name="Add team"
                                  className="pl-1"
                                  icon={<Plus width={18} height={18} />}
                                />
                              </div>
                            </AccordionItem>
                          </Accordion>
                        </>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Dialog>
          </Transition>

          <div className="sticky top-0 z-40 flex items-center gap-4 border-b bg-background px-6 py-2 shadow-sm sm:px-6 lg:hidden">
            <Button
              type="button"
              className="-m-2.5 p-2.5 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              variant="ghost"
            >
              <span className="sr-only">Open sidebar</span>
              <PanelLeft className="size-5" aria-hidden="true" />
            </Button>

            <div className="flex items-center gap-4 text-lg font-semibold">
              <ArrowLeft
                width={20}
                height={20}
                onClick={() => router.push(`/${workspace?.url_key}`)}
                className="cursor-pointer"
              />
              Settings
            </div>
          </div>

          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              minSize={15}
              maxSize={20}
              className={
                'hidden border-none lg:inset-y-0 lg:z-50 lg:flex lg:h-screen lg:flex-col'
              }
            >
              <div className="flex grow flex-col justify-between">
                <div className="flex items-center gap-4 p-4 text-lg font-semibold">
                  <ArrowLeft
                    width={20}
                    height={20}
                    onClick={() => router.push(`/${workspace?.url_key}`)}
                    className="cursor-pointer"
                  />
                  Settings
                </div>

                <div className="flex flex-1 flex-col px-4">
                  <>
                    <Accordion
                      type="single"
                      collapsible
                      className="flex flex-col justify-start transition-all"
                    >
                      <AccordionItem value="home" className="border-none">
                        <div className="text-md mb-1 flex w-full items-center justify-start gap-3 text-black/70 dark:text-white/70">
                          <div>
                            <CircleUserRound width={18} height={18} />
                          </div>
                          <p className="truncate">Account</p>
                        </div>

                        <div className="pl-7">
                          <MenuSidebarButton
                            url={`/${workspace?.url_key}/settings/my-account`}
                            name="My account"
                            className="pl-1"
                          />
                        </div>
                      </AccordionItem>

                      <AccordionItem value="home" className="mt-2 border-none">
                        <div className="text-md mb-1 flex w-full items-center justify-start gap-3 text-black/70 dark:text-white/70">
                          <div>
                            <Building width={18} height={18} />
                          </div>
                          <p className="truncate">Workspace</p>
                        </div>

                        {settingsWorkspaceNavigation.map((item) => {
                          return (
                            <div className="pl-7" key={item.name}>
                              <MenuSidebarButton
                                url={`/${workspace?.url_key}/settings/${item.url}`}
                                name={item.name}
                                className="pl-1"
                              />
                            </div>
                          );
                        })}
                      </AccordionItem>

                      <AccordionItem value="home" className="mt-2 border-none">
                        <div className="text-md mb-1 flex w-full items-center justify-start gap-3 text-black/70 dark:text-white/70">
                          <Users width={18} height={18} />
                          Teams
                        </div>

                        <div className="pl-7">
                          {teams?.map((team, index) => {
                            return (
                              <Accordion type="single" collapsible key={index}>
                                <AccordionItem
                                  value={team.identifier}
                                  className="border-none"
                                >
                                  <AccordionTrigger className="m-0 p-0 no-underline">
                                    <Button
                                      variant="ghost"
                                      className={cn(
                                        'h-8 w-full justify-start gap-2 no-underline hover:bg-muted/80',
                                        'pl-1',
                                      )}
                                    >
                                      {team.name}
                                    </Button>
                                  </AccordionTrigger>
                                  <AccordionContent className="border-none">
                                    {settingsTeamsNavigation.map((item) => {
                                      return (
                                        <div className="pl-4" key={item.name}>
                                          <MenuSidebarButton
                                            url={`/${workspace?.url_key}/settings/teams/${team.identifier}/${item.url}`}
                                            name={item.name}
                                            className="pl-1 text-gray-600 dark:text-white/70"
                                          />
                                        </div>
                                      );
                                    })}
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            );
                          })}
                        </div>

                        <div className="pl-7 text-gray-600 dark:text-white/70">
                          <MenuSidebarButton
                            url={`/${workspace?.url_key}/settings/new-team`}
                            name="Add team"
                            className="pl-1"
                            icon={<Plus width={18} height={18} />}
                          />
                        </div>
                      </AccordionItem>
                    </Accordion>
                  </>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle className="border-none" />
            <ResizablePanel className="flex h-lvh min-w-0">
              <main className="relative flex-1 overflow-auto rounded-md border-border bg-background sm:my-2 sm:mr-2 sm:border">
                {children}
              </main>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </body>
    </html>
  );
}
