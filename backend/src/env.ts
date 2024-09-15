import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DB_USER: z.string(),
  DB_HOST: z.string(),
  DB_DATABASE: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.number(),
  SECRET_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
