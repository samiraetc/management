import { PrismaClient, TeamLabels } from '@prisma/client';
import {
  CreateTeamLabel,
  CreateTeamLabelByWorkspace,
  EditTeamLabels,
} from './types';

const prisma = new PrismaClient();

const addWorkspaceLabelInAllTeams = async (
  data: CreateTeamLabelByWorkspace,
  id: string,
) => {
  const teams = await prisma.team.findMany({
    where: { workspace_id: id },
  });

  const teamLabelsData = teams.map((team) => ({
    id: data.id,
    team_id: team.id,
    name: data.name,
    color: data.color,
    can_edit: false,
  }));

  await prisma.teamLabels.createMany({
    data: teamLabelsData,
    skipDuplicates: true,
  });
};

const selectAllTeamLabel = async (id: string): Promise<TeamLabels[]> => {
  const customLabels = await prisma.teamLabels.findMany({
    where: {
      team_id: id,
    },
    select: {
      id: true,
      name: true,
      color: true,
      can_edit: true,
      created_at: true,
      team_id: true,
    },
  });

  return customLabels;
};

const addTeamLabel = async (data: CreateTeamLabel): Promise<TeamLabels> => {
  const newLabel = await prisma.teamLabels.create({
    data: {
      team_id: data.team_id,
      name: data.name,
      color: data.color,
      can_edit: data.can_edit,
    },
  });

  return newLabel;
};

const editTeamLabel = async (
  data: EditTeamLabels,
  id: string,
): Promise<TeamLabels> => {
  const Label = prisma.teamLabels.update({
    where: { id: id, can_edit: true },
    data: {
      name: data.name,
      color: data.color,
    },
  });
  return Label;
};

const deleteTeamLabel = async (id: string): Promise<TeamLabels | null> => {
  return await prisma.$transaction(async (prisma) => {
    await prisma.taskLabels.deleteMany({
      where: { team_label_id: id },
    });

    return await prisma.teamLabels.delete({
      where: { id },
    });
  });
};

const selectTeamLabel = async (
  id: string,
  team_id: string,
): Promise<TeamLabels | null> => {
  const label = prisma.teamLabels.findUnique({
    where: { id, team_id },
  });
  return label;
};

const selectTeamLabelByName = async (name: string, workspace_id: string) => {
  const label = await prisma.workspaceLabels.findFirst({
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

  return label;
};

export {
  addWorkspaceLabelInAllTeams,
  selectAllTeamLabel,
  addTeamLabel,
  editTeamLabel,
  deleteTeamLabel,
  selectTeamLabel,
  selectTeamLabelByName,
};
