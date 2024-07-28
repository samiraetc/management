import api from '@/pages/api/api';

export async function getTaskAssignedByUserId(
  workspaceId: string,
  userId: string,
  token: any,
) {
  return await api.get(`/workspace/${workspaceId}/task_assigned/${userId}`);
}
