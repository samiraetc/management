import { findUserByToken } from '@/middleware/auth';
import {
  createTask,
  deleteAllTasksByTeam,
  editTeamTask,
  getAllTaskByCreatedUser,
  getAllTasksByTeam,
  getTaskByIdentifier,
  getUniqueTask,
} from '@/models/task/task';
import { createTaskSchema, editTaskSchema } from '@/models/task/types';
import { selectTeam } from '@/models/teams/teams';
import { FastifyReply, FastifyRequest } from 'fastify';
import { selectAllTaskLabels } from '@/models/task-labels/task-labels';
import { selectAllTaskAssignedByTask } from '@/models/task-assigneds/task-assigneds';

const createTaskController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const user = await findUserByToken(request, reply);

    if (!user) {
      reply.code(400).send({ message: 'User not found' });
      return;
    }

    const team = await selectTeam(id);

    if (!team) {
      reply.code(404).send({ message: 'Team not found' });
      return;
    }

    const parsedBody = createTaskSchema.parse(request.body);

    const body = {
      title: parsedBody.title,
      description: parsedBody.description,
      priority: parsedBody.priority,
      estimative: parsedBody.estimative,
      status: parsedBody.status,
      labels: parsedBody.labels,
      creator: user.id,
      identifier: team.identifier,
      due_date: parsedBody.due_date,
      team_id: team.id,
      updated_at: new Date(),
      created_at: new Date(),
    };

    const task = await createTask(body);
    const labels = await selectAllTaskLabels(task.id);
    const taskAssigned = await selectAllTaskAssignedByTask(task.id);

    reply.code(201).send({
      data: {
        ...task,
        labels,
        assigned_to: taskAssigned,
      },
    });
  } catch (error) {
    reply.code(400).send(error);
  }
};

const selectAllTasks = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const team = await selectTeam(id);

    if (!team) {
      reply.code(404).send({ message: 'Team not found' });
      return;
    }

    const tasks = await getAllTasksByTeam(id);
    const allTasks = await Promise.all(
      tasks.map(async (task) => {
        const labels = await selectAllTaskLabels(task.id);
        const taskAssigned = await selectAllTaskAssignedByTask(task.id);

        return {
          ...task,
          labels,
          assigned_to: taskAssigned,
        };
      }),
    );

    reply.code(201).send({ data: allTasks });
  } catch (error) {
    reply
      .code(400)
      .send({ error: 'Failed to select all task labels', details: error });
  }
};

const selectTaskById = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const task = await getTaskByIdentifier(id);

    if (!task) {
      reply.code(404).send({ message: 'Task not found' });
      return;
    }

    const labels = await selectAllTaskLabels(task.id);
    const taskAssigned = await selectAllTaskAssignedByTask(task.id);

    reply
      .code(201)
      .send({ data: { ...task, labels, assigned_to: taskAssigned } });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to select task', details: error });
  }
};

const deleteAllTasks = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const team = await selectTeam(id);

    if (!team) {
      reply.code(404).send({ message: 'Team not found' });
      return;
    }

    await deleteAllTasksByTeam(id);

    reply.code(201).send({ data: 'Deleted success' });
  } catch (error) {
    reply
      .code(400)
      .send({ error: 'Failed to select all task labels', details: error });
  }
};

const updateTeamTask = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const task = await getUniqueTask(id);

    if (!task) {
      reply.code(404).send({ message: 'Task not found' });
      return;
    }

    const parsedBody = editTaskSchema.parse(request.body);

    const body = {
      title: parsedBody.title,
      description: parsedBody.description,
      priority: parsedBody.priority,
      estimative: parsedBody.estimative,
      status: parsedBody.status,
      labels: parsedBody.labels,
      due_date: parsedBody.due_date,
      updated_at: new Date(),
    };

    const editedLabel = await editTeamTask(body, task.id);
    const taskAssigned = await selectAllTaskAssignedByTask(task.id);

    reply.code(201).send({
      data: {
        ...editedLabel,
        labels: await selectAllTaskLabels(task.id),
        assigned_to: taskAssigned,
      },
    });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to edit label', details: error });
  }
};

const selectAllTasksCreatedBy = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user = await findUserByToken(request, reply);

    const { filter } = request.query as any;

    if (!user) {
      reply.code(400).send({ message: 'User not found' });
      return;
    }

    if (filter === 'created') {
      const tasks = await getAllTaskByCreatedUser(user.id);
      const allTasks = await Promise.all(
        tasks.map(async (task) => {
          const labels = await selectAllTaskLabels(task.id);
          const taskAssigned = await selectAllTaskAssignedByTask(task.id);

          return {
            ...task,
            labels,
            assigned_to: taskAssigned,
          };
        }),
      );

      reply.code(201).send({ data: allTasks });
    }
  } catch (error) {
    reply
      .code(400)
      .send({ error: 'Failed to select all task labels', details: error });
  }
};

export {
  createTaskController,
  selectAllTasks,
  deleteAllTasks,
  selectTaskById,
  updateTeamTask,
  selectAllTasksCreatedBy,
};
