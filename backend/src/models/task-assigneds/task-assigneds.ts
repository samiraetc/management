import { TaskAssigneds, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addTaskAssigneds = async (
  data: TaskAssigneds[],
): Promise<TaskAssigneds[]> => {
  return await prisma.$transaction(
    data.map((item) =>
      prisma.taskAssigneds.create({
        data: {
          task_id: item.task_id,
          user_id: item.user_id,
        },
      }),
    ),
  );
};

const selectTaskAssigned = async (
  data: TaskAssigneds,
): Promise<TaskAssigneds | null> => {
  return await prisma.taskAssigneds.findUnique({
    where: {
      user_id_task_id: {
        user_id: data.user_id,
        task_id: data.task_id,
      },
    },
  });
};

const selectAllTaskAssigneds = async (
  id: string,
  user_id: string,
): Promise<TaskAssigneds[] | []> => {
  return await prisma.taskAssigneds.findMany({
    where: {
      task_id: id,
      user_id: user_id,
    },
  });
};

const deleteTaskAssigned = async (
  data: TaskAssigneds,
): Promise<TaskAssigneds | null> => {
  return await prisma.taskAssigneds.delete({
    where: {
      user_id_task_id: {
        user_id: data.user_id,
        task_id: data.task_id,
      },
    },
  });
};

export {
  addTaskAssigneds,
  deleteTaskAssigned,
  selectTaskAssigned,
  selectAllTaskAssigneds,
};
