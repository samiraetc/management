import api from '@/app/api/api';

export async function getPriorities(): Promise<Priority[]> {
  const data = await api.get(`/priorities`);

  return data.data.data;
}
