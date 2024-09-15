import {
  createPriority,
  selectPriorities,
  selectPriority,
} from '@/models/priority/priority';
import { createPrioritySchema } from '@/models/priority/types';
import { FastifyReply, FastifyRequest } from 'fastify';

const getPriorities = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    reply.code(200).send({ data: await selectPriorities() });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to fetch priorities' });
  }
};

const getPriority = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  const priority = await selectPriority(id);
  if (!priority) {
    reply.code(409).send({ message: 'Priority not found' });
    return;
  }

  try {
    reply.code(200).send({ data: await selectPriority(id) });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to fetch priority' });
  }
};

const postPriority = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const parsedBody = createPrioritySchema.parse(request.body);

    const body = {
      name: parsedBody.name,
      value: parseInt(parsedBody.value),
    };
    reply.code(201).send({ data: await createPriority(body) });
  } catch (error) {
    reply
      .code(400)
      .send({ error: 'Failed to create priority', details: error });
  }
};

export { getPriorities, postPriority, getPriority };
