import { PrismaClient, Priority } from '@prisma/client';
import { CreatePriority } from './types';

const prisma = new PrismaClient();

const selectPriorities = async (): Promise<Priority[]> => {
  const priorities = await prisma.priority.findMany();
  return priorities;
};

const selectPriority = async (id: string): Promise<Priority | null> => {
  const priority = await prisma.priority.findUnique({
    where: { id },
  });

  return priority;
};

const createPriority = async (data: CreatePriority): Promise<Priority> => {
  const priority = await prisma.priority.create({
    data: {
      name: data.name,
      value: data.value,
    },
  });
  return priority;
};

export { Priority, selectPriorities, createPriority, selectPriority };
