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
} from 'lucide-react';
import { ModeToggle } from '../ModeToggle/ModeToggle';
import { translation } from '@/i18n/i18n';
import { useWorkspaceTeams } from '@/hook/useTeams/useWorkspaceTeams';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ConfigsDropdown from './components/ConfigsDropdown/ConfigsDropdown';

interface IMenuSidebar {
  shrink?: boolean;
  setShrink?: (value: boolean) => void;
}

const MenuSidebar: React.FC<IMenuSidebar> = ({ shrink, setShrink }) => {
  const dispatch = useDispatch();
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );
  const { data: teams, loading } = useWorkspaceTeams(workspace?.id ?? '');

  const handleRedirectToTeamPage = (team: any) => {
    dispatch({
      type: 'teams/setTeams',
      payload: team,
    });
  };

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
          <>
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
            </Accordion>

            <Accordion type="single" collapsible defaultValue="teams">
              <AccordionItem value="teams" className="border-none">
                <AccordionTrigger className="items-start rounded-md px-4 py-2 text-gray-500 hover:bg-fruit-salad-50 hover:no-underline dark:hover:bg-muted">
                  <div className="flex gap-2">
                    <p className="text-xs">
                      {translation('menuSidebar:your_teams')}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-none">
                  {!loading &&
                    teams?.map((team: any) => {
                      return (
                        <MenuSidebarButton
                          key={team.id}
                          url={`/${workspace?.url_key}/team/${team.identifier}`}
                          name={team.name}
                          onClick={() => handleRedirectToTeamPage(team)}
                        />
                      );
                    })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}

        <div role="list" className="flex flex-1 flex-col gap-y-7">
          <div className="-mx-5 mt-auto flex items-center justify-between border-t p-3">
            <ConfigsDropdown />

            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSidebar;
