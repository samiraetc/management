import { z } from 'zod';

const userSchema = z.object({
  id: z.string(),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  username: z.string().min(1, 'Username is required'),
  position: z.string().optional().nullable(),
  language: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export { userSchema, loginSchema };
