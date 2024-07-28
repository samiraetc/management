import { TeamTasks, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addTeamTasks = async (data: TeamTasks[]): Promise<TeamTasks[]> => {
  return await prisma.$transaction(
    data.map((item) =>
      prisma.teamTasks.create({
        data: {
          task_id: item.task_id,
          team_id: item.team_id,
        },
      }),
    ),
  );
};

const selectTeamTask = async (data: TeamTasks): Promise<TeamTasks | null> => {
  return await prisma.teamTasks.findUnique({
    where: {
      team_id_task_id: {
        team_id: data.team_id,
        task_id: data.task_id,
      },
    },
  });
};

const selectAllTeamTasks = async (id: string): Promise<TeamTasks[] | []> => {
  return await prisma.teamTasks.findMany({
    where: {
      team_id: id,
    },
  });
};

const deleteTeamTask = async (data: TeamTasks): Promise<TeamTasks | null> => {
  return await prisma.teamTasks.delete({
    where: {
      team_id_task_id: {
        team_id: data.team_id,
        task_id: data.task_id,
      },
    },
  });
};

export { addTeamTasks, deleteTeamTask, selectTeamTask, selectAllTeamTasks };
