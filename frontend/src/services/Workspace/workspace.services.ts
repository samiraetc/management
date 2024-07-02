import api from '@/pages/api/api';
import { ICreateWorkspace } from './types';
import { IServerResponse } from '@/types/types';

const WorkspaceServices = {
  create: async (
    payload: ICreateWorkspace,
    token: string,
  ): Promise<IServerResponse> => {
    const { data } = await api.post('/workspaces', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
};

export { WorkspaceServices };
