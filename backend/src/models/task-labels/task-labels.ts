import { TaskLabels, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addTaskLabels = async (data: TaskLabels[]): Promise<TaskLabels[]> => {
  return await prisma.$transaction(
    data.map((item) =>
      prisma.taskLabels.create({
        data: {
          task_id: item.task_id,
          team_label_id: item.team_label_id,
        },
      }),
    ),
  );
};

const selectTaskLabel = async (
  data: TaskLabels,
): Promise<TaskLabels | null> => {
  return await prisma.taskLabels.findUnique({
    where: {
      team_label_id_task_id: {
        team_label_id: data.team_label_id,
        task_id: data.task_id,
      },
    },
  });
};

const selectAllTaskLabels = async (id: string): Promise<TaskLabels[] | []> => {
  return await prisma.taskLabels.findMany({
    where: {
      task_id: id,
    },
  });
};

const deleteTaskLabel = async (
  data: TaskLabels,
): Promise<TaskLabels | null> => {
  return await prisma.taskLabels.delete({
    where: {
      team_label_id_task_id: {
        team_label_id: data.team_label_id,
        task_id: data.task_id,
      },
    },
  });
};

export { addTaskLabels, deleteTaskLabel, selectTaskLabel, selectAllTaskLabels };
