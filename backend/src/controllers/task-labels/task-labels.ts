import { selectTeam } from '@/models/teams/teams';
import { TaskLabels } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createTaskLabelsSchema } from '@/models/task-labels/types';
import {
  addTaskLabels,
  deleteTaskLabel,
  selectAllTaskLabels,
  selectTaskLabel,
} from '@/models/task-labels/task-labels';
import { selectTeamLabel } from '@/models/team-labels/team-labels';

const selectAllTaskLabel = async (
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

    const teamLabels = await selectAllTaskLabels(id);

    const labels = await Promise.all(
      teamLabels.map(async (item: TaskLabels) => {
        return await selectTeamLabel(item.team_label_id, id);
      }),
    );
    reply.code(201).send({ data: labels });
  } catch (error) {
    reply
      .code(400)
      .send({ error: 'Failed to select all task labels', details: error });
  }
};

const addTaskLabel = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const parsedBody = createTaskLabelsSchema.parse(request.body);

    const body = parsedBody.labels_ids.map((item: string) => ({
      task_id: id,
      team_label_id: item,
    }));

    reply.code(201).send({ data: await addTaskLabels(body) });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to add label', details: error });
  }
};

const removeTaskLabel = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id, label_id } = request.params as {
      id: string;
      label_id: string;
    };

    const body = {
      task_id: id,
      team_label_id: label_id,
    };

    const taskLabel = await selectTaskLabel(body);

    if (!taskLabel) {
      reply.code(404).send({ message: 'Label not found' });
      return;
    }

    const deletedTask = await deleteTaskLabel(body);
    reply.code(201).send({ data: deletedTask });
  } catch (error) {
    reply
      .code(400)
      .send({ error: 'Failed to remove task label', details: error });
  }
};

export { addTaskLabel, removeTaskLabel, selectAllTaskLabel };
