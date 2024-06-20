import "@fastify/jwt";
import {
  FastifyRequest,
  FastifyReply,
  FastifyInstance as Instance,
} from "fastify";

export interface FastifyInstance extends Instance {
  authenticate?: any;
}
