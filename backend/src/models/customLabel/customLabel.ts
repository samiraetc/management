import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface WorkspaceCustomLabel {
  workspace_id: string;
  name: string;
  color: string;
}

interface DeleteWorkspaceCustomLabel {
  label_id: string
}

const addWorkspaceCustomLabel = async (
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

const editWorkspaceCustomLabel = async (
  data: WorkspaceCustomLabel,
  id: string
): Promise<WorkspaceCustomLabel> => {
  const customLabel = prisma.workspaceCustomLabels.update({
    where: { id: id },
    data: {
      name: data.name,
      color: data.color,
    },
  });
  return customLabel;
};

const selectWorkspaceCustomLabel = async (
  id: string
): Promise<WorkspaceCustomLabel | null> => {
  const customLabel = prisma.workspaceCustomLabels.findUnique({
    where: { id },
  });
  return customLabel;
};

const deleteWorkspaceCustomLabel = async (
  id: string
): Promise<WorkspaceCustomLabel | null> => {
  const customLabel = prisma.workspaceCustomLabels.delete({
    where: { id },
  });
  return customLabel;
};

export {
  addWorkspaceCustomLabel,
  editWorkspaceCustomLabel,
  selectWorkspaceCustomLabel,
  deleteWorkspaceCustomLabel,
};
