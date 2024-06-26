import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Label {
  id?: string
  name: string;
  color: string;
}

const selectAllLabels = async (): Promise<Label[]> => {
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

const createLabel = async ({ name, color }: Label): Promise<Label> => {
  const label = await prisma.label.create({
    data: {
      name,
      color,
    },
  });
  return label;
};

export { Label, selectAllLabels, createLabel, selectLabel,selectLabelByName };
