import {
  PrismaClient,
  WorkspaceMembers,
  Workspace as PrismaWorkspace,
  Label as PrismaLabel,
  User as PrismaUser,
} from "@prisma/client";
import { Label } from "../labels/labels";
import { User } from "../user/user";

const prisma = new PrismaClient();

interface Workspace {
  name: string;
  creator: any;
  url_key: string;
  labels: Label[];
  members?: User[];
}

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
          label: { connect: { id: label.id } },
        })),
      },
      members: {
        create: {
          user: { connect: { id: data.creator } },
        },
      },
    },
  });

  const workspace = await selectWorkspaces(newWorkspace.id);

  return workspace;
};

const selectAllCustomLabel = async (id: string) => {
  const customLabels = await prisma.workspaceCustomLabels.findMany({
    where: {
      workspace_id: id,
    },
    select: {
      id: true,
      name: true,
      color: true,
    },
  });

  return customLabels;
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
  selectAllCustomLabel,
  createWorkspace,
  selectWorkspaces,
};
