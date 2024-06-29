import { PrismaClient, Workspace as PrismaWorkspace } from '@prisma/client';

import { Label } from '../labels/labels';
import { User } from '../user/user';

const prisma = new PrismaClient();

interface Workspace {
  name: string;
  creator: string;
  url_key: string;
  labels: Label[];
  members?: User[];
  permission: string;
}

const createWorkspace = async (data: Workspace): Promise<PrismaWorkspace> => {
  const workspace = await prisma.workspace.create({
    data: {
      name: data.name,
      creator: {
        connect: { id: data.creator },
      },
      url_key: data.url_key,
      labels: {
        create: data.labels.map((label) => ({
          id: label.id,
          name: label.name,
          color: label.color,
          can_edit: false,
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

const selectWorkspaces = async (id: string) => {
  const workspaces = await prisma.workspace.findUnique({
    where: { id: id },
  });

  return workspaces;
};

const selectAllWorkspaces = async () => {
  const workspaces = await prisma.workspace.findMany();

  return workspaces;
};

const deleteWorkspaces = async (id: string) => {
  try {
    await prisma.$transaction(async (prisma) => {
      // Deletar os registros de team_labels relacionados aos times que pertencem ao workspace_id
      await prisma.teamLabels.deleteMany({
        where: {
          team: {
            workspace_id: id,
          },
        },
      });

      // Deletar os registros de team_members relacionados aos times que pertencem ao workspace_id
      await prisma.teamMembers.deleteMany({
        where: {
          team: {
            workspace_id: id,
          },
        },
      });

      // Deletar os times que pertencem ao workspace_id
      await prisma.team.deleteMany({
        where: { workspace_id: id },
      });

      // Deletar os registros de workspace_labels relacionados ao workspace_id
      await prisma.workspaceLabels.deleteMany({
        where: { workspace_id: id },
      });

      // Deletar os registros de workspace_members relacionados ao workspace_id
      await prisma.workspaceMembers.deleteMany({
        where: { workspace_id: id },
      });

      // Finalmente, deletar o workspace
      await prisma.workspace.delete({
        where: { id },
      });
    });

    console.log('Workspace and related data deleted successfully');
  } catch (error) {
    console.error('Error deleting workspace and related data:', error);
  }
};

export {
  Workspace,
  selectAllWorkspaces,
  createWorkspace,
  selectWorkspaces,
  deleteWorkspaces,
};
