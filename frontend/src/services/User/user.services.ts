import api from '@/pages/api/api';
import { IServerResponse } from '@/types/types';
import { ICreateUserAccount } from './types';

const UserServices = {
  create: async (payload: ICreateUserAccount): Promise<IServerResponse> => {
    const { data } = await api.post('/users', payload);
    return data;
  },
};

export { UserServices };
