import { z } from 'zod';
import { teamLabelSchema } from '../team-labels/types';
import { userSchema } from '../user/type';

export interface CreateTask extends Task {
  task_number: number;
  team_id: string;
  creator: string;
}

export interface EditTask extends Task {
  id: string;
}

export interface Task {
  title: string;
  description: string | null;
  priority: number | null;
  estimative: number | null;
  url_key: string;
  status_id: string | null;
}

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  priority: z.number().nullable(),
  estimate: z.number().nullable(),
  task_number: z.number(),
  url_key: z.string(),
  status_id: z.string().nullable(),
  team_id: z.string(),
  creator_id: z.string(),
  labels: teamLabelSchema.array(),
  creator: userSchema,
});

export { taskSchema };
