import api from '@/app/api/api';

export async function getTeams(workspaceId: string): Promise<Team[]> {
  const data = await api.get(`/workspaces/${workspaceId}/teams`);

  return data.data.data;
}

export async function getTeamMembers(teamsId: string): Promise<User[]> {
  const data = await api.get(`/teams/${teamsId}/members`);

  return data.data.data;
}

export async function editTeam(
  teamsId: string,
  payload: { name?: string; identifier?: string },
): Promise<Team> {
  const data = await api.patch(`/teams/${teamsId}`, payload);

  return data.data.data;
}

export async function addTeamMembers(
  teamsId: string,
  payload: { email: string },
): Promise<User[]> {
  const data = await api.post(`/teams/${teamsId}/members`, payload);

  return data.data.data;
}

export async function createTeam(
  workspaceId: string,
  payload: CreateTeam,
): Promise<Team> {
  const data = await api.post(`/workspaces/${workspaceId}/teams`, payload);

  return data.data.data;
}

export async function getTeamLabels(workspaceId: string): Promise<Label[]> {
  const data = await api.get(`/teams/${workspaceId}/labels`);

  return data.data.data;
}

export async function createTeamLabel(
  teamId: string,
  payload: CreateLabel,
): Promise<Label> {
  const data = await api.post(`/teams/${teamId}/labels`, payload);

  return data.data.data;
}

export async function editTeamlabel(
  teamId: string,
  labelId: string,
  payload: EditLabel,
): Promise<Label> {
  const data = await api.patch(`/teams/${teamId}/labels/${labelId}`, payload);

  return data.data.data;
}

export async function deleteTeamlabel(
  teamId: string,
  labelId: string,
): Promise<Label> {
  const data = await api.delete(`/teams/${teamId}/labels/${labelId}`);

  return data.data.data;
}
