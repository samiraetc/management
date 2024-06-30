import { selectTeam } from '@/models/teams/teams';
import { TeamTasks } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

import {
  addTeamTasks,
  deleteTeamTask,
  selectAllTeamTasks,
  selectTeamTask,
} from '@/models/team-tasks/team-tasks';
import { createTeamTasksSchema } from '@/models/team-tasks/types';

const selectAllTeamTask = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const team = await selectTeam(id);

    if (!team) {
      reply.code(404).send({ message: 'Team not found' });
      return;
    }

    const teamTasks = await selectAllTeamTasks(id);

    const tasks = await Promise.all(
      teamTasks.map(async (item: TeamTasks) => {
        return await selectTeamTask({
          task_id: item.task_id,
          team_id: id,
        });
      }),
    );
    reply.code(201).send({ data: tasks });
  } catch (error) {
    reply
      .code(400)
      .send({ error: 'Failed to select all task', details: error });
  }
};

const addTeamTask = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const parsedBody = createTeamTasksSchema.parse(request.body);

    const body = parsedBody.task_ids.map((item: string) => ({
      team_id: id,
      task_id: item,
    }));

    reply.code(201).send({ data: await addTeamTasks(body) });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to add task', details: error });
  }
};

const removeTeamTask = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id, task_id } = request.params as {
      id: string;
      task_id: string;
    };

    const body = {
      team_id: id,
      task_id: task_id,
    };

    const teamTask = await selectTeamTask(body);

    if (!teamTask) {
      reply.code(404).send({ message: 'Task not found' });
      return;
    }

    reply.code(201).send({ data: await deleteTeamTask(body) });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to remove task', details: error });
  }
};

export { addTeamTask, removeTeamTask, selectAllTeamTask };
