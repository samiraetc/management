import { TaskAssigneds, PrismaClient, User } from '@prisma/client';
import { AssignedUser } from './types';

const prisma = new PrismaClient();

const addTaskAssigneds = async (
  assigned: TaskAssigneds[],
): Promise<TaskAssigneds[]> => {
  return await prisma.$transaction(
    assigned.map((user) =>
      prisma.taskAssigneds.create({
        data: {
          task_id: user.task_id,
          user_id: user.user_id,
        },
      }),
    ),
  );
};

const selectTaskAssigned = async (
  user_id: string,
  id: string,
): Promise<TaskAssigneds | null> => {
  const items = await prisma.taskAssigneds.findUnique({
    where: {
      user_id_task_id: {
        user_id,
        task_id: id,
      },
    },
  });
  return items;
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

const selectAllTaskAssignedByTask = async (
  id: string,
): Promise<AssignedUser[]> => {
  const response = await prisma.taskAssigneds.findMany({
    where: {
      task_id: id,
    },
    select: {
      user: {
        select: {
          id: true,
          full_name: true,
          email: true,
          username: true,
        },
      },
      user_id: false,
      task_id: false,
    },
  });

  return response.map((taskAssigned) => taskAssigned.user);
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
  selectAllTaskAssignedByTask,
};
