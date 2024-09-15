import { PrismaClient, Workspace as PrismaWorkspace } from '@prisma/client';

import { Label } from '../labels/labels';
import { User } from '../user/user';
import { deleteTeams } from '../teams/teams';
import { deleteWorkspaceLabels } from '../workspace-labels/workspace-label';
import { deleteWorkspaceMembers } from '../workspace-members/workspace-members';
import { deleteTaskLabels } from '../task-labels/task-labels';
import { deleteTasks } from '../task/task';

const prisma = new PrismaClient();

interface Workspace {
  name: string;
  creator: string;
  url_key: string;
  labels: Label[];
  members?: User[];
  permission: string;
  created_at: Date;
  updated_at: Date;
}

const createWorkspace = async (data: Workspace): Promise<PrismaWorkspace> => {
  const workspace = await prisma.workspace.create({
    data: {
      name: data.name,
      creator: {
        connect: { id: data.creator },
      },
      url_key: data.url_key,
      created_at: data.created_at,
      updated_at: data.updated_at,
      labels: {
        create: data.labels.map((label) => ({
          name: label.name,
          color: label.color,
          created_at: label.created_at,
          can_edit: true,
        })),
      },
      members: {
        create: {
          user: { connect: { id: data.creator } },
          permission: data.permission,
        },
      },
    },
  });

  return workspace;
};

const selectWorkspace = async (id: string) => {
  const workspaces = await prisma.workspace.findUnique({
    where: { id: id },
  });

  return workspaces;
};

const selectWorkspaces = async (user_id: string) => {
  const workspaces = await prisma.workspace.findMany({
    where: {
      creator_id: user_id,
    },
  });

  return workspaces;
};

const deleteWorkspace = async (workspaceId: string) => {
  try {
    await prisma.workspace.delete({
      where: { id: workspaceId },
    });
    console.log('Workspace deleted successfully');
  } catch (error) {
    console.error('Error deleting workspace:', error);
    throw error;
  }
};

const deleteWorkspaces = async (id: string): Promise<void> => {
  try {
    await prisma.$transaction(async () => {
      await deleteTasks(id);
      await deleteTaskLabels(id);
      await deleteTeams(id);
      await deleteWorkspaceLabels(id);
      await deleteWorkspaceMembers(id);
      await deleteWorkspace(id);
    });

    console.log('Workspace and related data deleted successfully');
  } catch (error) {
    console.error('Error deleting workspace and related data:', error);

    throw error;
  }
};

export {
  Workspace,
  selectWorkspace,
  selectWorkspaces,
  createWorkspace,
  deleteWorkspaces,
};
