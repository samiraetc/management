import useFetch from '../useFetch/useFetch';
import { IUseWorkspaceData } from './types';

const useWorkspaceByUser = (userId: string) => {
  return useFetch<IUseWorkspaceData[]>({
    url: `/workspaces`,
    params: { user_id: userId },
  });
};

export { useWorkspaceByUser };
