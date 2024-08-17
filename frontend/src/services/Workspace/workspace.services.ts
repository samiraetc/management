import api from '@/pages/api/api';

export async function getWorkspaces(): Promise<Workspace[]> {
  const data = await api.get(`/workspaces`);

  return data.data.data;
}

export async function createWorkspaces(
  payload: CreateWorkspace,
  token: string,
): Promise<Workspace> {
  const data = await api.post(`/workspaces`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}

export async function editWorkspaces(
  workspaceId: string,
  payload: CreateWorkspace,
): Promise<Workspace> {
  const data = await api.post(`/workspaces/${workspaceId}`, payload);

  return data.data;
}

export async function deleteWorkspaces(
  workspaceId: string,
): Promise<Workspace> {
  const data = await api.delete(`/workspaces/${workspaceId}`);

  return data.data;
}
