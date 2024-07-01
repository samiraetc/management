import useFetch from '../useFetch/useFetch';
import { IUseTeamsData } from './types';

const useWorkspaceTeams = (workspaceId: string) => {
  return useFetch<IUseTeamsData[]>({ url: `/workspaces/${workspaceId}/teams` });
};

export { useWorkspaceTeams };
