import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import routes from './routes';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}

const server = Fastify({
  logger: true,
});

server.register(fastifyCors, {
  origin: '*',
});

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Minha API',
      description: 'Documentação da API usando OpenAPI 3',
      version: '0.1.0',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
});

server.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
    displayRequestDuration: true,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

server.register(fastifyJwt, {
  secret: process.env.SECRET_KEY as string,
});

server.decorate(
  'authenticate',
  async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized' });
    }
  },
);

server.register(routes, { prefix: '/api' });

server.get('/api', async (_, reply) => {
  try {
    reply.send({ hello: 'world' });
  } catch (err) {
    server.log.error(err);
    reply.status(500).send('Database error');
  }
});

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    server.swagger();
    console.log('Server is running on http://localhost:3000/api');
    console.log(
      'Swagger documentation is available on http://localhost:3000/documentation',
    );
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

if (require.main === module) {
  start();
}

export { server };
