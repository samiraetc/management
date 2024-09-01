import { User } from '@prisma/client';

import { z } from 'zod';

export type UserWithoutPassword = Omit<User, 'password' | 'image'>;

export type CreateUser = Omit<User, 'id'>;

export type EditUser = {
  first_name?: string;
  last_name?: string;
  user_name?: string;
  position?: string;
};

const userSchema = z.object({
  id: z.string(),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  username: z.string().min(1, 'Username is required'),
  position: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

const createUserSchema = userSchema.omit({ id: true });

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const editUserSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().optional(),
  position: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

export { userSchema, loginSchema, createUserSchema, editUserSchema };
