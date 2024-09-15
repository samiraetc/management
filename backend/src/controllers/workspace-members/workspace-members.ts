import { selectUser } from '@/models/user/user';
import {
  createWorkspaceMembersSchema,
  editWorkspaceMembersSchema,
} from '@/models/workspace-members/types';
import {
  addWorkspaceMembers,
  deleteWorkspaceMember,
  editAllWorkspaceMembers,
  selectAllWorkspaceMembers,
  selectWorkspaceMember,
} from '@/models/workspace-members/workspace-members';

import { MemberPermission } from '@/utils/member-permission';
import { FastifyReply, FastifyRequest } from 'fastify';

const selectWorkspaceMembers = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };

    const member = await selectAllWorkspaceMembers(id);

    if (!member) {
      reply.code(404).send({ message: 'Member not found' });
      return;
    }

    const members = await Promise.all(
      member.map(async (member) => {
        const selectedMember = await selectUser(member.user_id);
        return { ...selectedMember, permission: member.permission };
      }),
    );
    reply.code(200).send({ data: members });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to show members', details: error });
  }
};

const addWorkspaceMember = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const parsedBody = createWorkspaceMembersSchema.parse(request.body);

    const body = parsedBody.user_ids.map((member: string) => ({
      workspace_id: id,
      user_id: member,
      permission: MemberPermission.MEMBER,
    }));

    const member = await addWorkspaceMembers(body);

    const members = await Promise.all(
      member.map(async (member) => {
        const selectedMember = await selectUser(member.user_id);
        return await { ...selectedMember, permission: member.permission };
      }),
    );

    reply.code(201).send({ data: members });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to create member', details: error });
  }
};

const editWorkspaceMember = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id, member_id } = request.params as {
      id: string;
      member_id: string;
    };
    const parsedBody = editWorkspaceMembersSchema.parse(request.body);

    const member = await selectWorkspaceMember({
      workspace_id: id,
      user_id: member_id,
    });

    if (!member) {
      reply.code(404).send({ message: 'Member not found' });
      return;
    }

    const body = {
      workspace_id: id,
      user_id: member_id,
      permission: parsedBody.permission,
    };

    const editedMember = await editAllWorkspaceMembers(body);
    const selectedMember = await selectUser(editedMember.user_id);

    reply
      .code(200)
      .send({ data: { ...selectedMember, permission: member.permission } });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to create member', details: error });
  }
};

const removeWorkspaceMember = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id, member_id } = request.params as {
      id: string;
      member_id: string;
    };

    const body = {
      workspace_id: id,
      user_id: member_id,
    };

    const member = await selectWorkspaceMember(body);

    if (!member) {
      reply.code(404).send({ message: 'Member not found' });
      return;
    }

    const deletedMember = await deleteWorkspaceMember(body);
    reply.code(200).send({ data: deletedMember });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to remove member', details: error });
  }
};

export {
  addWorkspaceMember,
  removeWorkspaceMember,
  selectWorkspaceMembers,
  editWorkspaceMember,
};
