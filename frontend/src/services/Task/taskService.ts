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
