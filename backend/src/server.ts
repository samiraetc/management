import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import pool from "@/database";
import routes from "./routes";
import fastifyJwt from "@fastify/jwt";
import dotenv from "dotenv";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

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

// Configuração do fastify-swagger
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Minha API',
      description: 'Documentação da API usando OpenAPI 3',
      version: '0.1.0'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{ bearerAuth: [] }]
  }
});

server.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: (request, reply, next) => { next(); },
    preHandler: (request, reply, next) => { next(); }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject; },
  transformSpecificationClone: true,
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
    console.log("Swagger documentation is available on http://localhost:3000/documentation");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

if (require.main === module) {
  start();
}

export { server };
