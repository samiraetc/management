import api from '@/app/api/api';

export async function getEstimativeByName(name: string): Promise<Estimative> {
  const data = await api.get(`/estimatives/${name}`);

  return data.data.data;
}
