import { createUser, selectAllUsers, selectUser } from '@/models/user/user';
import { userSchema } from '@/schemas/user/user';
import bcrypt from 'bcrypt';
import { FastifyRequest, FastifyReply } from 'fastify';

const createUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const parsedBody = userSchema.parse(request.body);

    const body = {
      first_name: parsedBody.first_name,
      last_name: parsedBody.last_name,
      full_name: `${parsedBody.first_name} ${parsedBody.last_name}`,
      email: parsedBody.email,
      password: await bcrypt.hash(parsedBody.password, 10),
      created_at: new Date(),
      username: parsedBody.username,
      position: parsedBody.position,
      language: parsedBody.language,
    };

    const user = await createUser(body);

    reply.code(201).send({ data: user });
  } catch (error) {
    reply.code(400).send(error);
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

export { createUserController, selectUserController, getAllUsers };
