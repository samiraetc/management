/* eslint-disable prettier/prettier */
import { z } from 'zod';

const createTaskAssignedSchema = z.object({
  user_ids: z.string().min(1, 'User is required').array(),
});

export { createTaskAssignedSchema };
