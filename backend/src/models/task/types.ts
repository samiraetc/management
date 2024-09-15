import { z } from 'zod';
import { userSchema } from '../user/type';

export interface CreateTask extends Task {
  labels?: { id: string }[];
  identifier: string;
  team_id: string;
  creator: string;
  updated_at: Date;
  created_at: Date;
  due_date?: string | null;
  workspace_id: string;
  assigned?: string | null;
}

export interface EditTask extends Task {
  id: string;
}

export interface Task {
  title: string;
  description?: string | null;
  priority?: string | null;
  estimative?: string | null;
  status?: string | null;
}

const createTaskSchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  priority: z.string().nullable().optional(),
  estimative: z.string().nullable().optional(),
  assigned: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  due_date: z.string().nullable().optional(),
  labels: z
    .array(
      z.object({
        id: z.string(),
      }),
    )
    .optional(),
});

const editTaskSchema = z.object({
  title: z.string().optional(),
  assigned: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  priority: z.string().nullable().optional(),
  estimative: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  due_date: z.string().nullable().optional(),
  labels: z
    .array(
      z.object({
        id: z.string(),
      }),
    )
    .optional(),
});

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  priority: z.string().nullable(),
  estimative: z.string().nullable(),
  identifier: z.string(),
  status: z.string().nullable(),
  team_id: z.string(),
  creator_id: z.string(),
  labels: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        color: z.string(),
        can_edit: z.boolean(),
        created_at: z.date(),
      }),
    )
    .optional(),
  creator: userSchema,
});

export { taskSchema, createTaskSchema, editTaskSchema };
