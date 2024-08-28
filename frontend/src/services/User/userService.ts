import api from '@/pages/api/api';

export async function createUser(
  payload: CreateUser,
): Promise<IServerResponse> {
  return await api.post('/users', payload);
}

export async function editUser(
  userId: string,
  payload: EditUser,
): Promise<IServerResponse> {
  return await api.patch(`/user/${userId}`, payload);
}

export async function getUser(userId: string): Promise<User> {
  const user = await api.get(`/users/${userId}`);

  return user.data.data;
}
