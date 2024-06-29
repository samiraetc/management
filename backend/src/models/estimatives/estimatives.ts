import { PrismaClient, Estimatives } from '@prisma/client';

const prisma = new PrismaClient();

const selectAllEstimatives = async (): Promise<Estimatives[]> => {
  const estimatives = await prisma.estimatives.findMany();
  return estimatives;
};

const selectEstimativeByName = async (
  name: string,
): Promise<Estimatives | null> => {
  const estimativeByName = await prisma.estimatives.findUnique({
    where: { name },
  });

  return estimativeByName;
};

const createEstimative = async ({
  name,
  points,
}: Estimatives): Promise<Estimatives> => {
  const createdEstimative = await prisma.estimatives.create({
    data: {
      name,
      points,
    },
  });
  return createdEstimative;
};

export {
  Estimatives,
  selectEstimativeByName,
  createEstimative,
  selectAllEstimatives,
};
