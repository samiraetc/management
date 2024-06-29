/* eslint-disable prettier/prettier */
import { z } from 'zod';
import { TeamMembers } from '@prisma/client';

export type TeamMembersWithoutPermission = Omit<TeamMembers, 'permission'>;

const teamMembers = z.object({
  user_id: z.string(),
  team_id: z.string(),
  permission: z.string(),
});

const createTeamMembers = z.object({
  user_ids: z.string().min(1, 'User is required').array(),
});

const editTeamMembersSchema = teamMembers.omit({
  user_id: true,
  team_id: true,
});

export { createTeamMembers, editTeamMembersSchema };
