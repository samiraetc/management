/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient, Team } from '@prisma/client';
import { CreateTeam, EditTeam } from './types';

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

const updateTeam = async (data: EditTeam, id: string): Promise<Team> => {
  const team = await prisma.team.update({
    where: { id },
    data: {
      name: data.name,
      identifier: data.identifier,
    },
  });

  return team;
};

const findTeam = async (id: string): Promise<Team | null> => {
  const team = await prisma.team.findUnique({
    where: { id: id },
  });

  return team;
};

const findTeamsByWorkspaceId = async (id: string): Promise<Team[] | []> => {
  const team = await prisma.team.findMany({
    where: { workspace_id: id },
  });

  return team;
};

const deleteTeams = async (workspaceId: string) => {
  try {
    await prisma.teamLabels.deleteMany({
      where: { team: { workspace_id: workspaceId } },
    });
    await prisma.teamMembers.deleteMany({
      where: { team: { workspace_id: workspaceId } },
    });
    await prisma.team.deleteMany({
      where: { workspace_id: workspaceId },
    });
    console.log('Teams and related data deleted successfully');
  } catch (error) {
    console.error('Error deleting teams and related data:', error);
    throw error;
  }
};

export {
  createTeam,
  findTeam,
  findTeamsByWorkspaceId,
  updateTeam,
  deleteTeams,
};
