import api from '@/app/api/api';

export async function getLabels(workspaceId: string): Promise<Label[]> {
  const data = await api.get(`/workspaces/${workspaceId}/labels`);

  return data.data.data;
}

export async function createWorkspaceLabel(
  workspaceId: string,
  payload: CreateLabel,
): Promise<Label> {
  const data = await api.post(`/workspaces/${workspaceId}/labels`, payload);

  return data.data.data;
}

export async function editWorkspacelabel(
  workspaceId: string,
  labelId: string,
  payload: EditLabel,
): Promise<Label> {
  const data = await api.patch(
    `/workspaces/${workspaceId}/labels/${labelId}`,
    payload,
  );

  return data.data.data;
}

export async function deleteWorkspacelabel(
  workspaceId: string,
  labelId: string,
): Promise<Label> {
  const data = await api.delete(`/workspaces/${workspaceId}/labels/${labelId}`);

  return data.data.data;
}

export async function getTeamLabels(teamId: string): Promise<Label[]> {
  const data = await api.get(`/teams/${teamId}/labels`);

  return data.data.data;
}
