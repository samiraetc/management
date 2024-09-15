import { FastifyReply } from 'fastify';

export const sendResult = (
  reply: FastifyReply,
  data: any,
  statusCode = 200,
) => {
  reply.code(statusCode).send({ data });
};

export const sendResultError = (
  reply: FastifyReply,
  message: string,
  statusCode = 400,
) => {
  reply.code(statusCode).send({ error: message });
};
