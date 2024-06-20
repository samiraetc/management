import { server } from '../server';

describe('GET /', () => {
  beforeAll(async () => {
    // Garanta que o servidor Fastify esteja escutando antes dos testes
    await server.listen({ port: 4001, host: '0.0.0.0' });
  });

  afterAll(async () => {
    // Fecha o servidor Fastify após os testes
    await server.close();
  });

  it('responds with hello world', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/'
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ hello: 'world' });
  });
});
