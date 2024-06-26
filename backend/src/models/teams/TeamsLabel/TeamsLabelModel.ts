import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface WorkspaceLabel {
  id: string;
  name: string;
  color: string;
}

export interface TeamLabel {
  name: string;
  color: string;
  team_id: string;
  can_edit: boolean;
}

interface EditTeam {
  name: string;
  color: string;
}

const addWorkspaceLabelInAllTeams = async (
  data: WorkspaceLabel,
  workspace_id: string,
) => {
  const teams = await prisma.workspaceTeams.findMany({
    where: { workspace_id: workspace_id },
    select: { team_id: true },
  });

  const teamLabelsData = teams.map((team) => ({
    id: data.id,
    team_id: team.team_id,
    name: data.name,
    color: data.color,
    can_edit: false,
  }));

  await prisma.teamLabels.createMany({
    data: teamLabelsData,
  });
};

const selectAllTeamLabel = async (id: string) => {
  const customLabels = await prisma.teamLabels.findMany({
    where: {
      team_id: id,
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

const addTeamLabel = async (data: TeamLabel): Promise<TeamLabel> => {
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
  data: EditTeam,
  id: string,
): Promise<TeamLabel> => {
  const Label = prisma.teamLabels.update({
    where: { id: id, can_edit: true },
    data: {
      name: data.name,
      color: data.color,
    },
  });
  return Label;
};

const deleteTeamLabel = async (id: string): Promise<TeamLabel | null> => {
  const label = prisma.teamLabels.delete({
    where: { id },
  });
  return label;
};

const selectTeamLabel = async (
  id: string,
  team_id: string,
): Promise<TeamLabel | null> => {
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
      can_edit: true
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
  selectTeamLabelByName
};
