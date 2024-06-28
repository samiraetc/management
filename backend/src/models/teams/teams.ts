/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface WorkspaceLabel {
  id: string;
  name: string;
  color: string;
}

interface Team {
  name: string;
  identifier: string;
  creator: string;
  permission: string;
  labels: WorkspaceLabel[];
  workspace_id: string;
}

const createTeam = async (data: Team): Promise<any> => {
  const newTeam = await prisma.team.create({
    data: {
      name: data.name,
      creator: {
        connect: { id: data.creator },
      },
      identifier: data.identifier,
      workspace_id: data.workspace_id,
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

  const selectedTeam = await selectTeam(newTeam.id);

  return selectedTeam;
};

const selectTeam = async (id: string) => {
  const team = await prisma.team.findUnique({
    where: { id: id },
  });

  return team;
};

const selectAllTeams = async (id: string) => {
  const team = await prisma.team.findMany({
    where: { workspace_id: id },
  });

  return team;
};

export { createTeam, selectTeam, selectAllTeams };
