import { createUserSchema, editUserSchema } from '@/models/user/type';
import {
  createUser,
  editUser,
  selectAllUsers,
  selectUser,
} from '@/models/user/user';
import bcrypt from 'bcrypt';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

const createUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const parsedBody = createUserSchema.parse(request.body);

    const body = {
      first_name: parsedBody.first_name,
      last_name: parsedBody.last_name,
      full_name: `${parsedBody.first_name} ${parsedBody.last_name}`,
      email: parsedBody.email,
      password: await bcrypt.hash(parsedBody.password, 10),
      created_at: new Date(),
      username: parsedBody.username,
      position: parsedBody.position ?? null,
      language: parsedBody.language ?? null,
      image: parsedBody.image ?? null,
    };

    const user = await createUser(body);

    reply.code(201).send({ data: user });
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.reduce((acc: any, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      reply.code(400).send({ errors: formattedErrors });
    } else {
      reply.code(400).send(error);
    }
  }
};

const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const user = await selectUser(id);

    if (!user) {
      reply.code(404).send({ message: 'User not found' });
      return;
    }

    const parsedBody = editUserSchema.parse(request.body);

    const body = {
      first_name: parsedBody.first_name,
      last_name: parsedBody.last_name,
      username: parsedBody.username,
      position: parsedBody.position ?? '',
      image: parsedBody.image ?? null,
    };

    const editedUser = await editUser(body, id);

    reply.code(201).send({
      data: editedUser,
    });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to edit label', details: error });
  }
};

const selectUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };

    const user = await selectUser(id);

    if (!user) {
      reply.code(404).send({ message: 'User not found' });
      return;
    }

    reply.code(200).send({ data: user });
  } catch (error) {
    reply.code(400).send({ error });
  }
};

const getAllUsers = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await selectAllUsers();

    reply.code(200).send({ data: users });
  } catch (error) {
    reply.code(400).send({ error });
  }
};

export { createUserController, selectUserController, getAllUsers, updateUser };
