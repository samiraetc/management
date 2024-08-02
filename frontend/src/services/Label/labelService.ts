import api from '@/pages/api/api';

export async function getLabels(workspaceId: string): Promise<Label[]> {
  const data = await api.get(`/workspaces/${workspaceId}/labels`);

  return data.data.data;
}

export async function createWorkspaceLabel(
  workspaceId: string,
  payload: any,
): Promise<Label> {
  const data = await api.post(`/workspaces/${workspaceId}/labels`, payload);

  return data.data.data;
}
