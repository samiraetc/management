import { PrismaClient, WorkspaceLabels } from '@prisma/client';

import { addWorkspaceLabelInAllTeams } from '../team-labels/team-labels';
import { CreateWorkspaceLabel, EditWorkspaceLabels } from './types';

const prisma = new PrismaClient();

const addWorkspaceLabel = async (
  data: CreateWorkspaceLabel,
): Promise<WorkspaceLabels> => {
  const newLabel = await prisma.workspaceLabels.create({
    data: {
      workspace_id: data.workspace_id,
      name: data.name,
      color: data.color,
      can_edit: data.can_edit,
    },
  });

  console.log('workspace', data.workspace_id);

  await addWorkspaceLabelInAllTeams(
    {
      id: newLabel.id,
      workspace_id: data.workspace_id,
      name: newLabel.name,
      color: newLabel.color,
      created_at: newLabel.created_at,
    },
    data.workspace_id,
  );

  return newLabel;
};

const editWorkspaceLabel = async (
  data: EditWorkspaceLabels,
  id: string,
): Promise<WorkspaceLabels> => {
  return await prisma.workspaceLabels.update({
    where: { id: id, can_edit: true },
    data: {
      name: data.name,
      color: data.color,
    },
  });
};

const selectWorkspaceLabel = async (
  id: string,
  workspace_id: string,
): Promise<WorkspaceLabels | null> => {
  return await prisma.workspaceLabels.findUnique({
    where: { id, workspace_id },
  });
};

const deleteWorkspaceLabel = async (
  id: string,
): Promise<WorkspaceLabels | null> => {
  return await prisma.workspaceLabels.delete({
    where: { id },
  });
};

const selectAllWorkspaceLabel = async (id: string) => {
  return await prisma.workspaceLabels.findMany({
    where: {
      workspace_id: id,
    },
    select: {
      id: true,
      name: true,
      color: true,
      created_at: true,
      can_edit: true,
    },
  });
};

const selectWorkspaceLabelByName = async (
  name: string,
  workspace_id: string,
) => {
  return await prisma.workspaceLabels.findFirst({
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
};

export {
  WorkspaceLabels,
  addWorkspaceLabel,
  editWorkspaceLabel,
  selectWorkspaceLabel,
  deleteWorkspaceLabel,
  selectAllWorkspaceLabel,
  selectWorkspaceLabelByName,
};
