/* eslint-disable prettier/prettier */
import { z } from 'zod';

const createTeamTasksSchema = z.object({
  task_ids: z.string().min(1, 'User is required').array(),
});

export { createTeamTasksSchema };
