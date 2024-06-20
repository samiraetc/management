import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import MenuSidebarButton from './components/MenuSidebarButton';
import {
  ChevronsLeft,
  ChevronsRight,
  Home,
  ListTodo,
  LogOutIcon,
  SquareKanban,
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarImage } from '../ui/avatar';
import { ModeToggle } from '../ModeToggle/ModeToggle';
import { translation } from '@/i18n/i18n';

const workspaces = [
  {
    id: 'xpto',
    name: 'Workspace 1',
  },
  {
    id: 'xpto',
    name: 'Workspace 2',
  },
];

interface IMenuSidebar {
  shrink?: boolean;
  setShrink?: (value: boolean) => void;
}

const MenuSidebar: React.FC<IMenuSidebar> = ({ shrink, setShrink }) => {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r px-4">
      <div className="flex items-center justify-between">
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

      <div className="flex flex-1 flex-col">
        {!shrink && (
          <Accordion type="single" collapsible className="transition-all">
            <AccordionItem value="home" className="border-none">
              <MenuSidebarButton
                url="/"
                icon={<Home className="text-fruit-salad-600" />}
                name={translation('menuSidebar:home')}
              />
            </AccordionItem>

            <AccordionItem value="home" className="border-none">
              <MenuSidebarButton
                url="/my-issues"
                icon={<ListTodo className="text-fruit-salad-600" />}
                name={translation('menuSidebar:my_issues')}
              />
            </AccordionItem>

            <AccordionItem value="workspace" className="border-none">
              <AccordionTrigger className="items-start rounded-md px-4 py-2 hover:bg-fruit-salad-50 hover:no-underline dark:hover:bg-muted">
                <Link href="/workspace">
                  <div className="flex gap-2">
                    <SquareKanban className="text-fruit-salad-600" />
                    <p className="text-sm">
                      {translation('menuSidebar:workspaces')}
                    </p>
                  </div>
                </Link>
              </AccordionTrigger>
              <AccordionContent className="border-none">
                {workspaces.map((workspace) => {
                  return (
                    <MenuSidebarButton
                      key={workspace.id}
                      url={`/workspace/${workspace.id}`}
                      name={workspace.name}
                    />
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        <div role="list" className="flex flex-1 flex-col gap-y-7">
          <div className="-mx-5 mt-auto flex items-center justify-between border-t p-3">
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
                <DropdownMenuItem>
                  <Link
                    href="/account"
                    className="text-md w-full p-1 font-medium"
                  >
                    <p>My Account</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href="/logout"
                    className="text-md flex w-full justify-between"
                  >
                    <p>Logout</p>
                    <LogOutIcon width={20} />{' '}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSidebar;
