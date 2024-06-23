import { findUserByToken } from '@/middleware/auth';
import { selectAllLabels, selectLabel } from '@/models/labels/labels';
import { selectUser } from '@/models/user/user';
import {
  createWorkspace,
  selectAllCustomLabel,
  selectAllWorkspaces,
  selectWorkspaces,
} from '@/models/workspace/workspace';
import { workspaceSchema } from '@/schemas/workspace/workspaceSchema/workspaceSchema';
import { FastifyRequest, FastifyReply } from 'fastify';

import { MemberPermission } from '../members/membersController';

const createWorkspaceController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user = await findUserByToken(request, reply);
    const parsedBody = workspaceSchema.parse(request.body);

    const body = {
      name: parsedBody.name,
      url_key: parsedBody.url_key,
      creator: user?.id,
      labels: await selectAllLabels(),
      permission: MemberPermission.MEMBER,
    };

    const workspace = await createWorkspace(body);
    const creator = await selectUser(workspace.creator_id);
    const customLabels = await selectAllCustomLabel(workspace.id);

    const labels = await Promise.all(
      workspace.labels.map(async (label: { label_id: string }) => {
        return await selectLabel(label.label_id);
      }),
    );

    const members = await Promise.all(
      workspace.members.map(async (member: { user_id: string }) => {
        return await selectUser(member.user_id);
      }),
    );

    reply.code(201).send({
      data: {
        ...workspace,
        labels: [...labels, ...customLabels],
        creator,
        members,
      },
    });
  } catch (error) {
    reply.code(400).send(error);
  }
};

const getAllWorkspaces = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const workspaces = await selectAllWorkspaces();

    const workspacesWithLabels = await Promise.all(
      workspaces.map(async (workspace) => {
        const creator = await selectUser(workspace.creator_id);

        const customLabels = await selectAllCustomLabel(workspace.id);

        const labels = await Promise.all(
          workspace.labels.map(async (label) => {
            return await selectLabel(label.label_id);
          }),
        );

        const members = await Promise.all(
          workspace.members.map(async (member) => {
            const selectedMember = await selectUser(member.user_id);
            return await { ...selectedMember, permission: member.permission };
          }),
        );

        return {
          ...workspace,
          labels: [...labels, ...customLabels],
          creator,
          members,
        };
      }),
    );

    reply.code(200).send({
      data: workspacesWithLabels,
    });
  } catch (error) {
    reply.code(400).send({ error });
  }
};

const getWorkspace = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };

    const workspace = await selectWorkspaces(id);

    if (!workspace) {
      reply.code(404).send({ message: 'Workspace not found' });
      return;
    }

    const creator = await selectUser(workspace.creator_id);

    const customLabels = await selectAllCustomLabel(workspace.id);

    const labels = await Promise.all(
      workspace.labels.map(async (label) => {
        return await selectLabel(label.label_id);
      }),
    );

    const members = await Promise.all(
      workspace.members.map(async (member) => {
        const selectedMember = await selectUser(member.user_id);
        return await { ...selectedMember, permission: member.permission };
      }),
    );

    reply.code(200).send({
      data: {
        ...workspace,
        labels: [...labels, ...customLabels],
        creator,
        members,
      },
    });
  } catch (error) {
    reply.code(400).send({ error });
  }
};

export { createWorkspaceController, getAllWorkspaces, getWorkspace };
