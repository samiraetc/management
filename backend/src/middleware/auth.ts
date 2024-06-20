// middlewares/auth.js

import { FastifyReply, FastifyRequest } from "fastify";

const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function findUserByToken(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    reply.code(401).send({ error: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!request.user) {
      reply.code(401).send({ error: 'User not found' });
      return;
    }

    return request.user
  } catch (err) {
    reply.code(401).send({ error: 'Invalid token' });
  }
}

