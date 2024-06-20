import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  password: string;
  created_at?: Date;
  username: string;
  position?: string | null;
  language?: string | null;
}

type UserWithoutPassword = Omit<User, 'password'>;

const createUser = async (data: User): Promise<User> => {

  const user = await prisma.user.create({
    data: {
     ...data
    }
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
    }
  });

  return user;
};

const selectAllUsers = async (): Promise<UserWithoutPassword[]> => {
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
    },
  });

  return users;
};

const selectUsersByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
};

const selectUsersByUsername = async (username: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  return user;
};
export { User, UserWithoutPassword, createUser, selectUser, selectAllUsers, selectUsersByEmail, selectUsersByUsername };