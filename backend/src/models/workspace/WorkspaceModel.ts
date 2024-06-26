import { PrismaClient } from '@prisma/client';

import { Label } from '../labels/LabelsModel';
import { User } from '../user/userModel';

const prisma = new PrismaClient();

interface Workspace {
  name: string;
  creator: string;
  url_key: string;
  labels: Label[];
  members?: User[];
  permission: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createWorkspace = async (data: Workspace): Promise<any> => {
  const newWorkspace = await prisma.workspace.create({
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

  const workspace = await selectWorkspaces(newWorkspace.id);

  return workspace;
};


const selectWorkspaces = async (id: string) => {
  const workspaces = await prisma.workspace.findUnique({
    where: { id: id },
    include: {
      labels: true,
      members: true,
    },
  });

  return workspaces;
};

const selectAllWorkspaces = async () => {
  const workspaces = await prisma.workspace.findMany({
    include: {
      labels: true,
      members: true,
    },
  });

  return workspaces;
};

export {
  Workspace,
  selectAllWorkspaces,
  createWorkspace,
  selectWorkspaces,
};
