import React, { useEffect } from 'react';
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
import { useWorkspaceTeams } from '@/hook/useTeams/useWorkspaceTeams';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ConfigsDropdown from './components/ConfigsDropdown/ConfigsDropdown';
import { IUseWorkspaceData } from '@/hook/useWorkspace/types';

interface IMenuSidebar {
  shrink?: boolean;
  setShrink?: (value: boolean) => void;
  workspace: IUseWorkspaceData;
}

const MenuSidebar: React.FC<IMenuSidebar> = ({ shrink, setShrink }) => {
  const dispatch = useDispatch();
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );
  const { data: teams, loading } = useWorkspaceTeams(workspace?.id ?? '');

  useEffect(() => {
    if (!loading && teams) {
      dispatch({
        type: 'teams/setTeams',
        payload: teams[0],
      });
    }
  }, [teams, loading, workspace]);

  const handleRedirectToTeamPage = (team: any) => {
    dispatch({
      type: 'teams/setTeams',
      payload: team,
    });
  };

  return (
    <div className="flex grow flex-col gap-y-7 overflow-y-auto border-r px-4">
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
                <div className="text-md mb-5 flex w-full items-center justify-between gap-7 pl-4 font-semibold">
                  {workspace?.name}
                  <div className="rounded-lg border p-1.5">
                    <SquarePen width={20} height={20} />
                  </div>
                </div>
              </AccordionItem>

              <AccordionItem value="home" className="border-none">
                <MenuSidebarButton
                  url={`/${workspace?.url_key}`}
                  icon={<ListTodo className="text-gray-500" width={18} />}
                  name={translation('menuSidebar:my_issues')}
                />
              </AccordionItem>

              <AccordionItem value="home" className="border-none">
                <MenuSidebarButton
                  icon={<UsersRound className="text-gray-500" width={18} />}
                  name="Teams"
                />
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible defaultValue="teams">
              <AccordionItem value="teams" className="border-none">
                <AccordionTrigger className="mt-4 items-start rounded-md px-4 py-2 text-gray-500 hover:bg-muted hover:no-underline dark:hover:bg-muted">
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
          <div
            className={"-mx-7 p-3 pl-2 mt-auto flex items-center justify-between border-t"}
          >
            <ConfigsDropdown shrink={shrink} />

            {!shrink && <ModeToggle />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSidebar;
