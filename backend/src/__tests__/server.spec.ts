import { describe, expect, beforeAll, afterAll, it } from '@jest/globals';

import { server } from '../server';

describe('GET /', () => {
  beforeAll(async () => {
    await server.listen({ port: 4001, host: '0.0.0.0' });
  });

  afterAll(async () => {
    await server.close();
  });

  it('responds with hello world', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ hello: 'world' });
  });
});
