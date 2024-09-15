import { PrismaClient, User } from '@prisma/client';
import { CreateUser, EditUser, UserWithoutPassword } from './type';

const prisma = new PrismaClient();

const createUser = async (data: CreateUser): Promise<UserWithoutPassword> => {
  const user = await prisma.user.create({
    data: {
      ...data,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      full_name: true,
      email: true,
      created_at: true,
      username: true,
      position: true,
      language: true,
    },
  });

  return user;
};

const editUser = async (
  data: EditUser,
  id: string,
): Promise<UserWithoutPassword> => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      ...data,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      full_name: true,
      email: true,
      created_at: true,
      username: true,
      position: true,
      language: true,
      image: true,
    },
  });

  return user;
};

const selectUser = async (id: string): Promise<UserWithoutPassword | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      full_name: true,
      email: true,
      created_at: true,
      username: true,
      position: true,
      language: true,
      image: true,
    },
  });

  return user;
};

const selectUsers = async (): Promise<UserWithoutPassword[]> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      full_name: true,
      created_at: true,
      username: true,
      position: true,
      language: true,
      image: false,
    },
  });

  return users;
};

const selectUsersByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      workspaces: true,
    },
  });

  return user;
};

const selectUsersByUsername = async (
  username: string,
): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  return user;
};
export {
  User,
  UserWithoutPassword,
  createUser,
  selectUser,
  selectUsers,
  selectUsersByEmail,
  selectUsersByUsername,
  editUser,
};
