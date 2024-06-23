import '@fastify/jwt';
import { FastifyInstance as Instance } from 'fastify';

export interface FastifyInstance extends Instance {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authenticate?: any;
}
