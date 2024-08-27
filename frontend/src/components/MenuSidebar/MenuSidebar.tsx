import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ConfigsDropdown from './components/ConfigsDropdown/ConfigsDropdown';
import { getTeams } from '@/services/Teams/teamsService';
import CreateTask from '../CreateTask/CreateTask';
import { useRouter } from 'next/router';

interface IMenuSidebar {
  shrink?: boolean;
  setShrink?: (value: boolean) => void;
}

const MenuSidebar: React.FC<IMenuSidebar> = ({ shrink, setShrink }) => {
  const router = useRouter();
  const [createTask, setCreateTask] = useState<boolean>(false);
  const dispatch = useDispatch();
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );

  const teams = useSelector((state: RootState) => state.teams.teams);

  useEffect(() => {
    if (teams?.length === 0 && workspace?.url_key) {
      router.push(`${workspace?.url_key}/settings/new-team`);
    }
  }, [workspace?.url_key]);

  const getWorkspaceTeams = async (id: string) => {
    await getTeams(id).then((response) => {
      dispatch({
        type: 'teams/setTeams',
        payload: response,
      });
    });
  };

  useEffect(() => {
    getWorkspaceTeams(workspace?.id ?? '');
  }, [workspace?.url_key]);

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
                    <SquarePen
                      width={20}
                      height={20}
                      onClick={() => {
                        setCreateTask(true);
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </AccordionItem>

              <AccordionItem value="home" className="border-none">
                <MenuSidebarButton
                  url={`/${workspace?.url_key}/my-issues`}
                  icon={<ListTodo className="text-gray-500" width={18} />}
                  name={'My Issues'}
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
                    <p className="text-xs">Your Teams</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-none">
                  {teams?.map((team) => {
                    return (
                      <MenuSidebarButton
                        key={team.id}
                        url={`/${workspace?.url_key}/teams/${team.identifier}`}
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

      {createTask && <CreateTask open={createTask} setOpen={setCreateTask} />}
    </div>
  );
};

export default MenuSidebar;
