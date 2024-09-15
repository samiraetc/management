import { TeamMembers, PrismaClient } from '@prisma/client';
import { TeamMembersWithoutPermission } from './types';

const prisma = new PrismaClient();

const addTeamsMembers = async (data: TeamMembers): Promise<TeamMembers> => {
  return await prisma.teamMembers.create({
    data: {
      team_id: data.team_id,
      user_id: data.user_id,
      permission: data.permission,
    },
  });
};

const selectTeamsMember = async (
  data: TeamMembersWithoutPermission,
): Promise<TeamMembers | null> => {
  return await prisma.teamMembers.findUnique({
    where: {
      user_id_team_id: {
        user_id: data.user_id,
        team_id: data.team_id,
      },
    },
  });
};

const selectAllTeamsMember = async (id: string): Promise<TeamMembers[]> => {
  return await prisma.teamMembers.findMany({
    where: {
      team_id: id,
    },
  });
};

const editTeamsMembers = async (data: TeamMembers): Promise<TeamMembers> => {
  return await prisma.teamMembers.update({
    where: {
      user_id_team_id: {
        user_id: data.user_id,
        team_id: data.team_id,
      },
    },
    data: {
      permission: data.permission,
    },
  });
};

const deleteTeamMember = async (
  data: TeamMembersWithoutPermission,
): Promise<TeamMembersWithoutPermission | null> => {
  return await prisma.$transaction(async (prisma) => {
    const tasks = await prisma.tasks.findMany({
      where: {
        assigned_to: data.user_id,
      },
    });

    await Promise.all(
      tasks.map((task) =>
        prisma.tasks.update({
          where: { id: task.id },
          data: {
            assigned: {
              disconnect: { id: data.user_id },
            },
          },
        }),
      ),
    );

    const deletedMember = await prisma.teamMembers.delete({
      where: {
        user_id_team_id: {
          user_id: data.user_id,
          team_id: data.team_id,
        },
      },
    });

    return deletedMember;
  });
};
export {
  addTeamsMembers,
  deleteTeamMember,
  selectTeamsMember,
  selectAllTeamsMember,
  editTeamsMembers,
};
