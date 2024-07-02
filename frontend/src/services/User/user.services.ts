import api from '@/pages/api/api';
import { IServerResponse } from '@/types/types';
import { ICreateUserAccount } from './types';

const UserServices = {
  create: async (
    payload: ICreateUserAccount,
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

export { UserServices };
