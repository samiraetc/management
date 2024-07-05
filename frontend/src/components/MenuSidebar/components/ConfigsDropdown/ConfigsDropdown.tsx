import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@headlessui/react';
import { dropdownNavigation } from './navigation';
import { useWorkspaceByUser } from '@/hook/useWorkspace/useWorkspaces';
import { useSession } from 'next-auth/react';
import { Check } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { IUseWorkspaceData } from '@/hook/useWorkspace/types';
import { logout } from '@/redux/actions/actions';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import useWindowSize from '@/hook/useWindowSize/useWindowSize';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';

const ConfigsDropdown = ({ shrink }: { shrink?: boolean }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, loading } = useWorkspaceByUser();
  const [open, setOpen] = useState(false);

  const workspaceStorage = localStorage.getItem('workspace');

  const setWorkspaceStorage = (workspace: IUseWorkspaceData) => {
    localStorage.setItem('workspace', workspace.url_key);
    dispatch({
      type: 'workspace/setWorkspace',
      payload: workspace,
    });

    router.push(`/${workspace.url_key}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('workspace');
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'K' || e.key === 'k') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  });

  return (
    !loading && (
      <>
        <Menubar className="border-none">
          <MenubarMenu>
            <MenubarTrigger
              className="flex cursor-pointer items-center gap-2 focus:bg-none"
              asChild
            >
              <div>
                <Avatar className="size-12">
                  <AvatarImage
                    className="wrounded-"
                    src="https://api.dicebear.com/8.x/lorelei/svg?backgroundColor=8fc69b&hair=variant18&earrings=variant01&mouth=happy16&eyes=variant23&scale=160"
                  />
                </Avatar>
                {!shrink && (
                <p className="font-medium">{session?.user.full_name}</p>
              )}
              </div>
            </MenubarTrigger>
            <MenubarContent className="ml-4 w-64" sideOffset={10}>
              {dropdownNavigation.map((item) => {
                return (
                  <>
                    {item.type === 'link' && (
                      <>
                        <MenubarItem key={item.name}>
                          <Link
                            href={item.url ?? ''}
                            className="text-md w-full p-1 font-medium"
                          >
                            <p>{item.name}</p>
                          </Link>
                        </MenubarItem>
                        {item.separator && <MenubarSeparator />}
                      </>
                    )}
                    {item.type === 'button' && (
                      <>
                        <MenubarItem key={item.name}>
                          <Button
                            className="text-md flex w-full justify-between p-1"
                            onClick={() => {
                              item.name === 'logout' && handleLogout();
                              item.action && item.action();
                            }}
                          >
                            <p>{item.name}</p>
                            {item.icon && <item.icon width={16} />}
                          </Button>
                        </MenubarItem>
                        {item.separator && <MenubarSeparator />}
                      </>
                    )}

                    {item.type === 'list' && (
                      <>
                        <MenubarItem
                          key={item.name}
                          onClick={() => setOpen(true)}
                        >
                          <Button className="text-md flex w-full justify-between p-1">
                            <p>{item.name}</p>
                            {item.icon && <item.icon width={16} />}
                            <MenubarShortcut>⌘K</MenubarShortcut>
                          </Button>
                        </MenubarItem>
                      </>
                    )}
                  </>
                );
              })}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          className="w-80 translate-x-[-50%] translate-y-[-12%] rounded-md sm:w-full sm:translate-x-[-50%] sm:translate-y-[-50%]"
        >
          <CommandInput placeholder="Switch workspace" autoFocus />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Workspaces">
              {data?.map((workspace, index) => (
                <CommandItem key={workspace.name}>
                  <Button
                    className="text-md flex w-full items-center justify-between"
                    onClick={() => {
                      setWorkspaceStorage(workspace);
                      setOpen(false);
                    }}
                  >
                    {workspace.name}
                    {workspace?.url_key === workspaceStorage ? (
                      <Check width={14} height={14} />
                    ) : (
                      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <CommandShortcut>{index + 1}</CommandShortcut>
                      </kbd>
                    )}
                  </Button>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Account">
              {dropdownNavigation?.map((item) => {
                return (
                  <>
                    {item.children?.map((child) => (
                      <CommandItem key={child.name}>
                        <Link href={child.url ?? ''} className="text-md w-full">
                          <p>{child.name}</p>
                        </Link>

                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-70">
                          <CommandShortcut>J</CommandShortcut>
                        </kbd>
                      </CommandItem>
                    ))}
                  </>
                );
              })}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    )
  );
};

export default ConfigsDropdown;
