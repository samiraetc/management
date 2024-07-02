import useFetch from '../useFetch/useFetch';
import { IUseWorkspaceData } from './types';

const useWorkspaceByUser = () => {
  return useFetch<IUseWorkspaceData[]>({
    url: `/workspaces`,
  });
};

export { useWorkspaceByUser };
