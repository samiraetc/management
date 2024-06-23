import { WorkspaceMembers, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface WorkspaceMemberss extends WorkspaceMembersIdentify {
  permission: string;
}

interface WorkspaceMembersIdentify {
  user_id: string;
  workspace_id: string;
}

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
  data: WorkspaceMembersIdentify,
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

const deleteWorkspaceMember = async (
  data: WorkspaceMembersIdentify,
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

export { addWorkspaceMembers, deleteWorkspaceMember, selectWorkspaceMember };
