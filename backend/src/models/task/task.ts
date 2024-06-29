import { PrismaClient, Tasks } from '@prisma/client';
import { EditTask, CreateTask } from './types';

const prisma = new PrismaClient();

const createTask = async (data: CreateTask): Promise<Tasks> => {
  const task = await prisma.tasks.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
      estimative: data.estimative,
      task_number: data.task_number,
      url_key: data.url_key,
      status_id: data.status_id,
      team_id: data.team_id,
      creator: {
        connect: { id: data.creator },
      },
    },
  });

  return task;
};

const editTask = async (data: EditTask): Promise<Tasks> => {
  const task = await prisma.tasks.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
      estimative: data.estimative,
      url_key: data.url_key,
      status_id: data.status_id,
    },
  });

  return task;
};

export { createTask, editTask };
