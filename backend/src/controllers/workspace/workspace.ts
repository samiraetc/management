import { findUserByToken } from '@/middleware/auth';
import { selectLabels } from '@/models/labels/labels';
import { selectUser } from '@/models/user/user';
import { workspaceSchema } from '@/models/workspace/types';
import {
  createWorkspace,
  selectWorkspaces,
  selectWorkspace,
  deleteWorkspaces,
} from '@/models/workspace/workspace';
import { MemberPermission } from '@/utils/member-permission';
import { FastifyRequest, FastifyReply } from 'fastify';

const postWorkspace = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = await findUserByToken(request, reply);

    if (!user) {
      reply.code(400).send({ message: 'User not found' });
      return;
    }
    const parsedBody = workspaceSchema.parse(request.body);

    const body = {
      name: parsedBody.name,
      url_key: parsedBody.url_key,
      creator: user.id,
      updated_at: new Date(),
      created_at: new Date(),
      labels: await selectLabels(),
      permission: MemberPermission.ADMIN,
    };

    const workspace = await createWorkspace(body);
    const creator = await selectUser(workspace.creator_id);

    reply.code(201).send({
      data: {
        ...workspace,
        creator,
      },
    });
  } catch (error) {
    reply.code(400).send(error);
  }
};

const getWorkspaces = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = await findUserByToken(request, reply);

    if (!user) {
      reply.code(400).send({ message: 'User not found' });
      return;
    }

    const workspaces = await selectWorkspaces(user.id);

    const workspace = await Promise.all(
      workspaces.map(async (workspace) => {
        return {
          ...workspace,
          creator: await selectUser(workspace.creator_id),
        };
      }),
    );

    reply.code(200).send({
      data: workspace,
    });
  } catch (error) {
    reply.code(400).send({ error });
  }
};

const getWorkspace = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };

    const workspace = await selectWorkspace(id);

    if (!workspace) {
      reply.code(404).send({ message: 'Workspace not found' });
      return;
    }

    const creator = await selectUser(workspace.creator_id);

    reply.code(200).send({
      data: {
        ...workspace,
        creator,
      },
    });
  } catch (error) {
    reply.code(400).send({ error });
  }
};

const deleteWorkspace = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };

    const workspace = await selectWorkspace(id);

    if (!workspace) {
      reply.code(404).send({ message: 'Workspace not found' });
      return;
    }

    await deleteWorkspaces(id);

    reply.code(200).send({
      data: {
        message: 'Workspace deleted',
      },
    });
  } catch (error) {
    reply.code(400).send({ error });
  }
};

export { postWorkspace, getWorkspaces, getWorkspace, deleteWorkspace };
