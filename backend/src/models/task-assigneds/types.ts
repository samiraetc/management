/* eslint-disable prettier/prettier */
import { z } from 'zod';

export type AssignedUser = {
  id: string;
  full_name: string;
  email: string;
  username: string;
};

const createTaskAssignedSchema = z.object({
  user_ids: z.string().min(1, 'User is required').array(),
});

export { createTaskAssignedSchema };
