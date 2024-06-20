import {
  PrismaClient,
  WorkspaceMembers,
  Label as PrismaLabel,
  User as PrismaUser,
} from "@prisma/client";

const prisma = new PrismaClient();

interface Workspace {
  name: string;
  creator: string;
  url_key: string;
  labels: PrismaLabel[];
  members?: PrismaUser[];
}

interface WorkspaceCustomLabel {
  workspace_id: string;
  name: string;
  color: string;
}

// const createWorkspace = async (data: Workspace): Promise<PrismaWorkspace> => {
//   const existingLabels = await prisma.label.findMany();

// Crie o workspace e associe as labels
//   const newWorkspace = await prisma.workspace.create({
//     data: {
//       name: data.name,
//       creator: data.creator,
//       url_key: data.url_key,
//       labels: {
//         create: existingLabels.map((label) => ({
//           label: { connect: { id: label.id } }
//         })),
//       },
//     },
//   });

//   return newWorkspace;
// };

const workspaceCustomLabel = async (
  data: WorkspaceCustomLabel
): Promise<WorkspaceCustomLabel> => {
  const customLabel = prisma.workspaceCustomLabels.create({
    data: {
      workspace_id: data.workspace_id,
      name: data.name,
      color: data.color,
    },
  });
  return customLabel;
};

const addWorkspaceMembers = async (
  members: WorkspaceMembers[]
): Promise<WorkspaceMembers[]> => {
  const createdMembers = await prisma.$transaction(
    members.map((member) =>
      prisma.workspaceMembers.create({
        data: {
          workspace_id: member.workspace_id,
          user_id: member.user_id,
        },
      })
    )
  );

  return createdMembers;
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
  workspaceCustomLabel,
  selectAllCustomLabel,
  addWorkspaceMembers,
};
