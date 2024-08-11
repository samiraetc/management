import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@headlessui/react';
import { dropdownNavigation } from './navigation';
import { signOut, useSession } from 'next-auth/react';
import { Check, LogOutIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
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
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { getWorkspaces } from '@/services/Workspace/workspace.services';

const ConfigsDropdown = ({ shrink }: { shrink?: boolean }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const workspaceStorage = localStorage.getItem('workspace');
  const [workspace, setWorkspace] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetWorkspace = async () => {
    await getWorkspaces()
      .then((response) => {
        setWorkspace(response);
      })
      .finally(() => setLoading(false));
  };

  const setWorkspaceStorage = (workspace: Workspace) => {
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
    signOut();
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'K' || e.key === 'k') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleGetWorkspace();
        setOpen((open) => !open);
      }

      if ((e.key === 'O' || e.key === 'o') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        router.push(`/${workspaceStorage}/settings/general`);
      }

      if ((e.key === 'A' || e.key === 'a') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        router.push(`/my-account`);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  });

  return (
    <>
      <Menubar className="border-none">
        <MenubarMenu>
          <MenubarTrigger
            className="flex cursor-pointer items-center gap-2 focus:bg-transparent data-[state=open]:bg-transparent"
            asChild
          >
            <div>
              <Avatar className="size-10">
                <AvatarImage src="https://api.dicebear.com/8.x/lorelei/svg?backgroundColor=8fc69b&hair=variant18&earrings=variant01&mouth=happy16&eyes=variant23&scale=160" />
              </Avatar>
              {!shrink && (
                <p className="font-medium">{session?.user.full_name}</p>
              )}
            </div>
          </MenubarTrigger>
          <MenubarContent className="ml-4 w-64" sideOffset={10}>
            <>
              <MenubarItem>
                <Link
                  href={'/my-account'}
                  className="text-md flex w-full items-center justify-between p-1 font-medium"
                >
                  <p>My Account</p>
                  <MenubarShortcut>⌘A</MenubarShortcut>
                </Link>
              </MenubarItem>
              <MenubarSeparator />

              <MenubarItem>
                <Link
                  href={`/${workspaceStorage}/settings/general`}
                  className="text-md flex w-full items-center justify-between p-1 font-medium"
                >
                  <p>Workspace Settings</p>
                  <MenubarShortcut>⌘O</MenubarShortcut>
                </Link>
              </MenubarItem>
            </>
            <MenubarItem
              onClick={() => {
                handleGetWorkspace();
                setOpen(true);
              }}
            >
              <Button className="text-md flex w-full justify-between p-1">
                <p>Switch Workspace</p>

                <MenubarShortcut>⌘K</MenubarShortcut>
              </Button>
            </MenubarItem>
            <MenubarItem>
              <Button
                className="text-md flex w-full justify-between p-1"
                onClick={() => handleLogout()}
              >
                <p>Logout</p>
                <LogOutIcon width={16} />
              </Button>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {!loading && workspace && (
        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          className="w-80 -translate-x-1/2 translate-y-[-12%] rounded-md sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2"
        >
          <CommandInput placeholder="Switch workspace" autoFocus />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Workspaces">
              {workspace.map((workspace: Workspace, index: number) => (
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
              <CommandItem>
                <Link href={'/join'} className="text-md w-full">
                  <p>Create or join a workspace</p>
                </Link>

                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-70">
                  <CommandShortcut>J</CommandShortcut>
                </kbd>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      )}
    </>
  );
};

export default ConfigsDropdown;
