import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@headlessui/react';
import { dropdownNavigation } from './navigation';
import { useWorkspaceByUser } from '@/hook/useWorkspace/useWorkspaces';
import { useSession } from 'next-auth/react';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { Check } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { IUseWorkspaceData } from '@/hook/useWorkspace/types';

const ConfigsDropdown = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, loading } = useWorkspaceByUser(session?.user.id ?? '');

  const workspaceStorage = localStorage.getItem('workspace');

  const setWorkspaceStorage = (workspace: IUseWorkspaceData) => {
    localStorage.setItem('workspace', workspace.url_key);
    dispatch({
      type: 'workspace/setWorkspace',
      payload: workspace,
    });

    router.push(workspace.url_key);
  };
  return (
    !loading && (
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
            <p className="font-medium">Samira Costa</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-4 w-64" sideOffset={10}>
          {dropdownNavigation.map((item) => {
            return (
              <>
                {item.type === 'link' && (
                  <>
                    <DropdownMenuItem>
                      <Link
                        href={item.url ?? ''}
                        className="text-md w-full p-1 font-medium"
                      >
                        <p>{item.name}</p>
                      </Link>
                    </DropdownMenuItem>
                    {item.separator && <DropdownMenuSeparator />}
                  </>
                )}
                {item.type === 'button' && (
                  <>
                    <DropdownMenuItem>
                      <Button className="text-md flex w-full justify-between p-1">
                        <p>{item.name}</p>
                        {item.icon && <item.icon width={16} />}
                      </Button>
                    </DropdownMenuItem>
                    {item.separator && <DropdownMenuSeparator />}
                  </>
                )}

                {item.type === 'list' && (
                  <>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Button className="text-md flex w-full justify-between p-1">
                          {item.name}
                        </Button>
                      </DropdownMenuSubTrigger>

                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="ml-2">
                          <DropdownMenuItem disabled>
                            {session?.user.email}
                          </DropdownMenuItem>
                          <DropdownMenuGroup>
                            {data?.map((workspace) => {
                              return (
                                <DropdownMenuItem>
                                  <Button
                                    className="text-md flex w-full items-center justify-between"
                                    onClick={() =>
                                      setWorkspaceStorage(workspace)
                                    }
                                  >
                                    {workspace.name}
                                    {workspace?.url_key ===
                                      workspaceStorage && (
                                      <Check width={14} height={14} />
                                    )}
                                  </Button>
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          {item.children?.map((child) => {
                            return (
                              <>
                                {child.type === 'link' && (
                                  <>
                                    <DropdownMenuItem>
                                      <Link
                                        href={child.url ?? ''}
                                        className="text-md w-full p-1"
                                      >
                                        <p>{child.name}</p>
                                      </Link>
                                    </DropdownMenuItem>
                                    {child.separator && (
                                      <DropdownMenuSeparator />
                                    )}
                                  </>
                                )}
                              </>
                            );
                          })}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </>
                )}
              </>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
};

export default ConfigsDropdown;
