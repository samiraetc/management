import { z } from 'zod';

const workspaceMembersSchema = z.object({
  user_ids: z.string().min(1, 'User is required').array(),
});

const editWorkspaceMemberSchema = z.object({
  permission: z.string(),
});

export { workspaceMembersSchema, editWorkspaceMemberSchema };
