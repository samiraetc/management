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
  ListTodo,
  SquarePen,
  UsersRound,
} from 'lucide-react';
import { ModeToggle } from '../ModeToggle/ModeToggle';
import { translation } from '@/i18n/i18n';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ConfigsDropdown from './components/ConfigsDropdown/ConfigsDropdown';

interface IMenuSidebar {
  shrink?: boolean;
  setShrink?: (value: boolean) => void;
  workspace: Workspace;
}

const MenuSidebar: React.FC<IMenuSidebar> = ({ shrink, setShrink }) => {
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );
  const teams = useSelector((state: RootState) => state.teams.teams);

  return (
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

      <div className="flex flex-1 flex-col px-2">
        {!shrink && (
          <>
            <Accordion type="single" collapsible className="transition-all">
              <AccordionItem value="home" className="border-none">
                <div className="text-md mb-5 flex w-full items-center justify-between gap-7 pl-2 font-semibold">
                  <p className="truncate">{workspace?.name}</p>
                  <div className="rounded-lg border p-1.5">
                    <SquarePen width={20} height={20} />
                  </div>
                </div>
              </AccordionItem>

              <AccordionItem value="home" className="border-none">
                <MenuSidebarButton
                  url={`/${workspace?.url_key}/my-issues`}
                  icon={<ListTodo className="text-gray-500" width={18} />}
                  name={translation('menuSidebar:my_issues')}
                />
              </AccordionItem>

              <AccordionItem value="home" className="border-none">
                <MenuSidebarButton
                  url={`/${workspace?.url_key}/teams`}
                  icon={<UsersRound className="text-gray-500" width={18} />}
                  name="Teams"
                />
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible defaultValue="teams">
              <AccordionItem value="teams" className="border-none">
                <AccordionTrigger className="mt-4 items-start rounded-md p-2 text-gray-500 hover:bg-muted hover:no-underline dark:hover:bg-muted">
                  <div className="flex gap-2">
                    <p className="text-xs">
                      {translation('menuSidebar:your_teams')}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-none">
                  {teams?.map((team) => {
                    return (
                      <MenuSidebarButton
                        key={team.id}
                        url={`/${workspace?.url_key}/team/${team.identifier}`}
                        name={team.name}
                      />
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mb-2 mt-auto flex justify-between pt-[5.3px]">
          <ConfigsDropdown shrink={shrink} />

          {!shrink && <ModeToggle />}
        </div>
      </div>
    </div>
  );
};

export default MenuSidebar;
