import React, { useEffect, useState, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

const ConfigsDropdown = () => {
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
      if (e.key === 'K' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open]);


  return (
    !loading && (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex cursor-pointer items-center gap-2"
            asChild
          >
            <div>
              <Avatar className="size-12">
                <AvatarImage
                  className="wrounded-"
                  src="https://api.dicebear.com/8.x/lorelei/svg?backgroundColor=8fc69b&hair=variant18&earrings=variant01&mouth=happy16&eyes=variant23&scale=160"
                />
              </Avatar>
              <p className="font-medium">{session?.user.full_name}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-4 w-72 sm:w-64" sideOffset={10}>
            {dropdownNavigation.map((item) => (
              <React.Fragment key={item.name}>
                {item.type === 'link' && (
                  <DropdownMenuItem>
                    <Link
                      href={item.url ?? ''}
                      className="text-md w-full p-1 font-medium"
                    >
                      <p>{item.name}</p>
                    </Link>
                  </DropdownMenuItem>
                )}
                {item.type === 'button' && (
                  <DropdownMenuItem>
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
                  </DropdownMenuItem>
                )}

                {item.type === 'list' && (
                  <>
                    <DropdownMenuItem className="w-full">
                      <Button
                        className="text-md flex w-full justify-between p-1"
                        onClick={() => setOpen(true)}
                      >
                        {item.name}
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                          <span className="text-xs">⌘</span>K
                        </kbd>
                      </Button>
                    </DropdownMenuItem>
                  </>
                )}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

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

                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
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
