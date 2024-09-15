import { PrismaClient, Estimatives } from '@prisma/client';

const prisma = new PrismaClient();

const selectEstimates = async (): Promise<Estimatives[]> => {
  const estimatives = await prisma.estimatives.findMany();
  return estimatives;
};

const selectEstimateByName = async (
  name: string,
): Promise<Estimatives | null> => {
  const estimativeByName = await prisma.estimatives.findUnique({
    where: { name },
  });

  return estimativeByName;
};

export { Estimatives, selectEstimateByName, selectEstimates };
