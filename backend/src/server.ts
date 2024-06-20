import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import pool from "@/database";
import routes from "./routes";
import fastifyJwt from "@fastify/jwt";
import dotenv from "dotenv";

dotenv.config();

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

const server = Fastify({
  logger: true,
});

server.register(fastifyJwt, {
  secret: process.env.SECRET_KEY as string,
});

server.decorate(
  "authenticate",
  async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  }
);

server.register(routes, { prefix: "/api" });

server.get("/api", async (_, reply) => {
  try {
    const res = await pool.query("SELECT NOW()");
    reply.send({ hello: "world", time: res.rows[0].now });
  } catch (err) {
    server.log.error(err);
    reply.status(500).send("Database error");
  }
});

const start = async () => {
  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server is running on http://localhost:3000/api");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

if (require.main === module) {
  start();
}

export { server };
