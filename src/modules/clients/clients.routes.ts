import { FastifyInstance } from 'fastify';
import { ClientsController } from './clients.controller';

export async function clientRoutes(app: FastifyInstance) {
  app.get('/', ClientsController.list);
  app.get('/:id', ClientsController.get);
  app.post('/', ClientsController.create);
  app.put('/:id', ClientsController.update);
  app.delete('/:id', ClientsController.remove);
}
