import { PrismaClient } from '@prisma/client';

import { addWorkspaceLabelInAllTeams } from '../teams/team-labels';

const prisma = new PrismaClient();

interface WorkspaceLabel {
  workspace_id: string;
  name: string;
  color: string;
  can_edit: boolean;
}

const addWorkspaceLabel = async (
  data: WorkspaceLabel,
): Promise<WorkspaceLabel> => {
  const newLabel = await prisma.workspaceLabels.create({
    data: {
      workspace_id: data.workspace_id,
      name: data.name,
      color: data.color,
      can_edit: data.can_edit,
    },
  });

  await addWorkspaceLabelInAllTeams(
    { id: newLabel.id, color: newLabel.color, name: newLabel.name },
    data.workspace_id,
  );

  return newLabel;
};

const editWorkspaceLabel = async (
  data: WorkspaceLabel,
  id: string,
): Promise<WorkspaceLabel> => {
  const Label = prisma.workspaceLabels.update({
    where: { id: id, can_edit: true },
    data: {
      name: data.name,
      color: data.color,
    },
  });
  return Label;
};

const selectWorkspaceLabel = async (
  id: string,
  workspace_id: string,
): Promise<WorkspaceLabel | null> => {
  const label = prisma.workspaceLabels.findUnique({
    where: { id, workspace_id },
  });
  return label;
};

const deleteWorkspaceLabel = async (
  id: string,
): Promise<WorkspaceLabel | null> => {
  const label = prisma.workspaceLabels.delete({
    where: { id },
  });
  return label;
};

const selectAllWorkspaceLabel = async (id: string) => {
  const customLabels = await prisma.workspaceLabels.findMany({
    where: {
      workspace_id: id,
    },
    select: {
      id: true,
      name: true,
      color: true,
      can_edit: true,
    },
  });

  return customLabels;
};

const selectWorkspaceLabelByName = async (
  name: string,
  workspace_id: string,
) => {
  const customLabels = await prisma.workspaceLabels.findFirst({
    where: {
      name,
      workspace_id: workspace_id,
    },
    select: {
      id: true,
      name: true,
      color: true,
      can_edit: true,
    },
  });

  return customLabels;
};

export {
  WorkspaceLabel,
  addWorkspaceLabel,
  editWorkspaceLabel,
  selectWorkspaceLabel,
  deleteWorkspaceLabel,
  selectAllWorkspaceLabel,
  selectWorkspaceLabelByName,
};
