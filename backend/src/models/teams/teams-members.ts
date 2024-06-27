import { TeamMembers, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface TeamsMemberss extends TeamsMembersIdentify {
  permission: string;
}

interface TeamsMembersIdentify {
  user_id: string;
  team_id: string;
}

const addTeamsMembers = async (
  members: TeamMembers[],
): Promise<TeamMembers[]> => {
  return await prisma.$transaction(
    members.map((member) =>
      prisma.teamMembers.create({
        data: {
          team_id: member.team_id,
          user_id: member.user_id,
          permission: member.permission,
        },
      }),
    ),
  );
};

const selectTeamsMember = async (
  data: TeamsMembersIdentify,
): Promise<TeamsMemberss | null> => {
  return await prisma.teamMembers.findUnique({
    where: {
      user_id_team_id: {
        user_id: data.user_id,
        team_id: data.team_id,
      },
    },
  });
};

const deleteTeamMember = async (
  data: TeamsMembersIdentify,
): Promise<TeamsMemberss | null> => {
  return await prisma.teamMembers.delete({
    where: {
      user_id_team_id: {
        user_id: data.user_id,
        team_id: data.team_id,
      },
    },
  });
};

export { addTeamsMembers, deleteTeamMember, selectTeamsMember };
