import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export const createLabel = async () => {
  const labels = [
    { name: 'bug', color: '#eb5757' },
    { name: 'feature', color: '#BB87FC' },
    { name: 'improvement', color: '#4EA7FC' },
    { name: 'canceled', color: '#4EA7FC' },
  ];

  for (const label of labels) {
    await prisma.label.upsert({
      where: { name: label.name },
      update: {},
      create: label,
    });
  }
};

export const createPriorities = async () => {
  const priorities = [
    { name: 'no_priority', value: 0 },
    { name: 'urgent', value: 1 },
    { name: 'high', value: 2 },
    { name: 'medium', value: 3 },
    { name: 'low', value: 4 },
  ];

  for (const priority of priorities) {
    await prisma.priority.create({
      data: {
        name: priority.name,
        value: priority.value,
      },
    });
  }
};

export const createEstimatives = async () => {
  const estimatives = [
    { name: 'exponential', points: ['1', '2', '4', '8', '16'] },
    { name: 'fibonacci', points: ['1', '2', '3', '5', '8'] },
    { name: 'linear', points: ['1', '2', '3', '4', '5'] },
    { name: 't-shirt', points: ['XS', 'S', 'M', 'L', 'XL'] },
  ];

  for (const estimative of estimatives) {
    await prisma.estimatives.upsert({
      where: { name: estimative.name },
      update: {},
      create: estimative,
    });
  }
};

export const createUser = async () => {
  const users = [
    {
      first_name: 'Admin',
      last_name: 'Dev',
      full_name: 'Admin Dev',
      email: 'admin@example.com',
      password: await bcrypt.hash('password', 10),
      created_at: new Date(),
      username: 'admindev',
      position: 'Developer',
      language: null,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
};
