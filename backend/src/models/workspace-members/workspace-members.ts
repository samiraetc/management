import { WorkspaceMembers, PrismaClient } from '@prisma/client';
import { WorkspaceMembersWithoutPermission } from './types';

const prisma = new PrismaClient();

const addWorkspaceMembers = async (
  members: WorkspaceMembers[],
): Promise<WorkspaceMembers[]> => {
  return await prisma.$transaction(
    members.map((member) =>
      prisma.workspaceMembers.create({
        data: {
          workspace_id: member.workspace_id,
          user_id: member.user_id,
          permission: member.permission,
        },
      }),
    ),
  );
};

const selectWorkspaceMember = async (
  data: WorkspaceMembersWithoutPermission,
): Promise<WorkspaceMembers | null> => {
  return await prisma.workspaceMembers.findUnique({
    where: {
      user_id_workspace_id: {
        user_id: data.user_id,
        workspace_id: data.workspace_id,
      },
    },
  });
};

const selectAllWorkspaceMembers = async (
  id: string,
): Promise<WorkspaceMembers[] | null> => {
  return await prisma.workspaceMembers.findMany({
    where: {
      workspace_id: id,
    },
  });
};

const editAllWorkspaceMembers = async (
  data: WorkspaceMembers,
): Promise<WorkspaceMembersWithoutPermission> => {
  return await prisma.workspaceMembers.update({
    where: {
      user_id_workspace_id: {
        user_id: data.user_id,
        workspace_id: data.workspace_id,
      },
    },
    data: {
      permission: data.permission,
    },
  });
};

const deleteWorkspaceMember = async (
  data: WorkspaceMembersWithoutPermission,
): Promise<WorkspaceMembers | null> => {
  return await prisma.workspaceMembers.delete({
    where: {
      user_id_workspace_id: {
        user_id: data.user_id,
        workspace_id: data.workspace_id,
      },
    },
  });
};

export {
  addWorkspaceMembers,
  deleteWorkspaceMember,
  selectWorkspaceMember,
  selectAllWorkspaceMembers,
  editAllWorkspaceMembers,
};
