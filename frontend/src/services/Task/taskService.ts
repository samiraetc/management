import api from '@/pages/api/api';

export async function getTaskAssignedByUserId(
  workspaceId: string,
  userId: string,
) {
  return await api.get(`/workspace/${workspaceId}/task_assigned/${userId}`);
}

export async function changeIssueTitle(
  workspaceId: string,
  taskId: string,
  payload: string,
) {
  return await api.patch(`/workspace/${workspaceId}/task/${taskId}`, payload);
}

export async function getAllTasksByTeam(teamId: string): Promise<Task[]> {
  const tasks = await api.get(`team/${teamId}/task`);

  return tasks.data.data;
}

export async function postTask(teamId: string, payload: any): Promise<Task> {
  const tasks = await api.post(`team/${teamId}/task`, payload);

  return tasks.data.data;
}

export async function getTaskDetails(taskId: string): Promise<Task> {
  const tasks = await api.get(`task/${taskId}`);

  return tasks.data.data;
}

export async function updateTaskDetails(
  taskId: string,
  payload: EditTask,
): Promise<Task> {
  const tasks = await api.patch(`task/${taskId}`, payload);

  return tasks.data.data;
}

export async function getAllTasksByUserFilters(
  filter: string,
): Promise<Task[]> {
  const tasks = await api.get(`/task?filter=${filter}`);

  return tasks.data.data;
}

export async function postAssignedTask(
  teamId: string,
  payload: {
    user_ids: string[];
  },
): Promise<Task> {
  const tasks = await api.post(`task/${teamId}/assigned`, payload);

  return tasks.data.data;
}
