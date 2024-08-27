import { FastifyReply, FastifyRequest } from 'fastify';
import {
  addTaskAssigneds,
  deleteTaskAssigned,
  selectAllTaskAssigneds,
  selectTaskAssigned,
} from '@/models/task-assigneds/task-assigneds';
import { createTaskAssignedSchema } from '@/models/task-assigneds/types';
import { selectWorkspaces } from '@/models/workspace/workspace';
import { selectAllTeams } from '@/models/teams/teams';
import { selectAllTeamTasks } from '@/models/team-tasks/team-tasks';

const selectAllTaskAssigned = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id, user_id } = request.params as { id: string; user_id: string };

    const workspaces = await selectWorkspaces(id);

    if (!workspaces) {
      reply.code(404).send({ message: 'Workspace not found' });
      return;
    }

    const teams = await selectAllTeams(id);

    const teamTasks: any = teams.map(
      async (team) => await selectAllTeamTasks(team.id),
    );

    const assignedTasks = teamTasks.map(
      async (task: { task_id: string }) =>
        await selectAllTaskAssigneds(task?.task_id, user_id),
    );

    reply.code(201).send({ data: assignedTasks });
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

    const taskLabel = await selectTaskAssigned(user_id, id);

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
