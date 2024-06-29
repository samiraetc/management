/* eslint-disable prettier/prettier */
import { z } from 'zod';
import { WorkspaceMembers } from '@prisma/client';

export type WorkspaceMembersWithoutPermission = Omit<
  WorkspaceMembers,
  'permission'
>;

const workspaceMembers = z.object({
  user_id: z.string(),
  workspace_id: z.string(),
  permission: z.string(),
});

const createWorkspaceMembersSchema = z.object({
  user_ids: z.string().min(1, 'User is required').array(),
});

const editWorkspaceMembersSchema = workspaceMembers.omit({
  user_id: true,
  workspace_id: true,
});

export { createWorkspaceMembersSchema, editWorkspaceMembersSchema };
