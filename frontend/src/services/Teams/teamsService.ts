import api from '@/pages/api/api';

export async function getTeams(workspaceId: string): Promise<Team[]> {
  const data = await api.get(`/workspaces/${workspaceId}/teams`);

  return data.data.data;
}

export async function getTeamMembers(teamsId: string): Promise<User[]> {
  const data = await api.get(`/teams/${teamsId}/members`);

  return data.data.data;
}

export async function createTeam(
  workspaceId: string,
  payload: CreateTeam,
): Promise<Team> {
  const data = await api.post(`/workspaces/${workspaceId}/teams`, payload);

  return data.data.data;
}
