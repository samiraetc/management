import { selectTeam } from '@/models/teams/teams';
import { TaskAssigneds } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  addTaskAssigneds,
  deleteTaskAssigned,
  selectAllTaskAssigneds,
  selectTaskAssigned,
} from '@/models/task-assigneds/task-assigneds';
import { createTaskAssignedSchema } from '@/models/task-assigneds/types';

const selectAllTaskAssigned = async (
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

    const taskAssigneds = await selectAllTaskAssigneds(id);

    const assigneds = await Promise.all(
      taskAssigneds.map(async (item: TaskAssigneds) => {
        return await selectTaskAssigned({
          user_id: item.user_id,
          task_id: id,
        });
      }),
    );
    reply.code(201).send({ data: assigneds });
  } catch (error) {
    reply
      .code(400)
      .send({ error: 'Failed to select all task labels', details: error });
  }
};

const addTaskAssigned = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const parsedBody = createTaskAssignedSchema.parse(request.body);

    const body = parsedBody.user_ids.map((item: string) => ({
      task_id: id,
      user_id: item,
    }));

    reply.code(201).send({ data: await addTaskAssigneds(body) });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to add label', details: error });
  }
};

const removeTaskAssigned = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id, user_id } = request.params as {
      id: string;
      user_id: string;
    };

    const body = {
      task_id: id,
      user_id,
    };

    const taskLabel = await selectTaskAssigned(body);

    if (!taskLabel) {
      reply.code(404).send({ message: 'Label not found' });
      return;
    }
    reply.code(201).send({ data: await deleteTaskAssigned(body) });
  } catch (error) {
    reply
      .code(400)
      .send({ error: 'Failed to remove task label', details: error });
  }
};

export { selectAllTaskAssigned, removeTaskAssigned, addTaskAssigned };
