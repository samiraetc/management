import {
  createPriority,
  selectAllPriorities,
  selectPriority,
} from '@/models/priority/priorityModel';
import { prioritySchema } from '@/schemas/priority/prioritySchema';
import { FastifyReply, FastifyRequest } from 'fastify';

const AllPriorityController = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    reply.code(200).send({ data: await selectAllPriorities() });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to fetch priorities' });
  }
};

const getPriorityController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string };

  try {
    reply.code(200).send({ data:  await selectPriority(id) });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to fetch priority' });
  }
};

const createPriorityController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const parsedBody = prioritySchema.parse(request.body);

    const body = {
      name: parsedBody.name,
      value: parseInt(parsedBody.value)
    };
    reply.code(201).send({ data: await createPriority(body) });
  } catch (error) {
    reply
      .code(400)
      .send({ error: 'Failed to create priority', details: error });
  }
};

export { AllPriorityController, createPriorityController, getPriorityController };
