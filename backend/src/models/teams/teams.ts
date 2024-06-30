/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient, Team } from '@prisma/client';
import { CreateTeam } from './types';

const prisma = new PrismaClient();

const createTeam = async (data: CreateTeam): Promise<Team> => {
  const team = await prisma.team.create({
    data: {
      name: data.name,
      creator: {
        connect: { id: data.creator_id },
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
          user: { connect: { id: data.creator_id } },
          permission: data.permission,
        },
      },
    },
  });

  return team;
};

const selectTeam = async (id: string): Promise<Team | null> => {
  const team = await prisma.team.findUnique({
    where: { id: id },
  });

  return team;
};

const selectAllTeams = async (id: string): Promise<Team[] | []> => {
  const team = await prisma.team.findMany({
    where: { workspace_id: id },
  });

  return team;
};

export { createTeam, selectTeam, selectAllTeams };
