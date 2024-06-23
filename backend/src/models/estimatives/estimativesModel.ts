import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Estimative {
  id: string
  name: string;
  points: string[];
}

const selectAllEstimatives = async (): Promise<Estimative[]> => {
  const estimatives = await prisma.estimatives.findMany();
  return estimatives;
};


const selectEstimativeByName = async (name: string): Promise<Estimative | null> => {
  const estimativeByName = await prisma.estimatives.findUnique({
    where: { name },
  });

  return estimativeByName;
};

const createEstimative = async ({ name, points }: Estimative): Promise<Estimative> => {
  const createdEstimative = await prisma.estimatives.create({
    data: {
      name,
      points,
    },
  });
  return createdEstimative;
};

export { Estimative, selectEstimativeByName, createEstimative, selectAllEstimatives };
