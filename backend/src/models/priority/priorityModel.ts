import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Priority {
  id?: string
  name: string;
  value: number;
}

const selectAllPriorities = async (): Promise<Priority[]> => {
  const priorities = await prisma.priority.findMany();
  return priorities;
};

const selectPriority = async (id: string): Promise<Priority | null> => {
  const priority = await prisma.priority.findUnique({
    where: { id },
  });

  return priority;
};

const createPriority = async ({ name, value }: Priority): Promise<Priority> => {
  const priority = await prisma.priority.create({
    data: {
      name,
      value,
    },
  });
  return priority;
};

export { Priority, selectAllPriorities, createPriority, selectPriority };
