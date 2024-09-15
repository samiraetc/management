import { PrismaClient, Label } from '@prisma/client';
import { CreateLabel } from './types';

const prisma = new PrismaClient();

const selectLabels = async (): Promise<Label[]> => {
  const labels = await prisma.label.findMany();
  return labels;
};

const selectLabel = async (id: string): Promise<Label | null> => {
  const label = await prisma.label.findUnique({
    where: { id },
  });

  return label;
};

const selectLabelByName = async (name: string): Promise<Label | null> => {
  const label = await prisma.label.findUnique({
    where: { name },
  });

  return label;
};

const createLabel = async ({ name, color }: CreateLabel): Promise<Label> => {
  const label = await prisma.label.create({
    data: {
      name,
      color,
    },
  });
  return label;
};

export { Label, selectLabels, createLabel, selectLabel, selectLabelByName };
