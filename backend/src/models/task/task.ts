import { Label, PrismaClient, Tasks } from '@prisma/client';
import { CreateTask } from './types';

const prisma = new PrismaClient();

const createTask = async (data: CreateTask): Promise<Tasks> => {
  const lastTask = await prisma.tasks.findFirst({
    where: {
      team_id: data.team_id,
      identifier: {
        startsWith: `${data.identifier}-`,
      },
    },
    orderBy: {
      identifier: 'desc',
    },
    select: {
      identifier: true,
    },
  });

  const lastNumber = lastTask
    ? parseInt(lastTask.identifier.split('-').pop() || '0', 10)
    : 0;

  const newIdentifier = `${data.identifier}-${lastNumber + 1}`;
  const task = await prisma.tasks.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
      estimative: data.estimative,
      identifier: newIdentifier,
      status: data.status,
      team_id: data.team_id,
      due_date: data.due_date,
      created_at: data.created_at,
      updated_at: data.updated_at,
      creator: {
        connect: { id: data.creator },
      },
    },
  });

  if (data.labels && data.labels.length > 0) {
    await prisma.$transaction(
      data.labels.map((label) =>
        prisma.taskLabels.create({
          data: {
            team_label_id: label.id,
            task_id: task.id,
          },
        }),
      ),
    );
  }

  return task;
};

const getAllTasksByTeam = async (id: string): Promise<Tasks[] | []> => {
  return await prisma.tasks.findMany({
    where: {
      team_id: id,
    },
  });
};

const getAllTaskByCreatedUser = async (id: string): Promise<Tasks[] | []> => {
  return await prisma.tasks.findMany({
    where: {
      creator_id: id,
    },
  });
};

const getUniqueTask = async (id: string): Promise<Tasks | null> => {
  return await prisma.tasks.findUnique({
    where: {
      id: id,
    },
  });
};

const editTeamTask = async (data: any, id: string): Promise<Tasks> => {
  const task = await prisma.tasks.update({
    where: { id: id },
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
      estimative: data.estimative,
      status: data.status,
      due_date: data.due_date,
      updated_at: data.updated_at,
    },
  });

  if (data.labels) {
    await prisma.$transaction(async (prisma) => {
      await prisma.taskLabels.deleteMany({
        where: {
          task_id: id,
          team_label_id: {
            notIn: data.labels.map((label: Label) => label.id),
          },
        },
      });

      await Promise.all(
        data.labels.map(async (label: Label) => {
          await prisma.taskLabels.upsert({
            where: {
              team_label_id_task_id: {
                team_label_id: label.id,
                task_id: id,
              },
            },
            update: {},
            create: {
              team_label_id: label.id,
              task_id: id,
            },
          });
        }),
      );
    });
  }

  return task;
};

const deleteAllTasksByTeam = async (id: string) => {
  await prisma.taskLabels.deleteMany({
    where: {
      task: {
        team_id: id,
      },
    },
  });
  await prisma.tasks.deleteMany({
    where: {
      team_id: id,
    },
  });
};

export {
  createTask,
  getAllTasksByTeam,
  deleteAllTasksByTeam,
  getUniqueTask,
  editTeamTask,
  getAllTaskByCreatedUser,
};
