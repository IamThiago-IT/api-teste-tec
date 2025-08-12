import { buildServer } from '../../src/core/server';
import request from 'supertest';

// mocka o ClientsService para evitar conexão com banco
jest.mock('../../src/modules/clients/clients.service', () => ({
  ClientsService: {
    // the controller calls listAll(), so we need to mock that
    listAll: jest.fn().mockResolvedValue([
      { id: 1, name: 'Cliente Teste', email: 'teste@example.com' },
    ]),
  },
}));

let app: any;

beforeAll(async () => {
  app = buildServer({ logger: false, enableDocs: false });
  await app.ready();
}, 10000); // aumenta timeout para 10s

afterAll(async () => {
  await app.close();
});

test('GET /clients status 200', async () => {
  const res = await request(app.server).get('/clients');
  expect(res.status).toBe(200);
  expect(res.body).toEqual([
    { id: 1, name: 'Cliente Teste', email: 'teste@example.com' },
  ]);
});
