import api from '@/pages/api/api';
import { ICreateUserAccount } from './types';

export async function createUser(
  payload: ICreateUserAccount,
): Promise<IServerResponse> {
  return await api.post('/users', payload);
}
