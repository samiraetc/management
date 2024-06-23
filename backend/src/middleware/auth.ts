import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

const prisma = new PrismaClient();

interface JwtPayload {
  email: string;
}

export async function findUserByToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    reply.code(401).send({ error: 'No token provided' });
    return;
  }

  try {
    const decoded = await request.jwtVerify<JwtPayload>();

    const { email } = decoded;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      reply.code(401).send({ error: 'User not found' });
      return;
    }

    return user;
  } catch (err) {
    reply.code(401).send({ error: 'Invalid token' });
  }
}
