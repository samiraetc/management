import api from '@/pages/api/api';
import { IServerResponse } from '@/types/types';
import { ICreateUserAccount } from './types';

export async function createUser (payload: ICreateUserAccount): Promise<IServerResponse> {
  return await api.post('/users', payload)
}

