import { FastifyInstance } from 'fastify';
import { GoalsController } from './goals.controller';

export async function goalsRoutes(app: FastifyInstance) {
  app.get('/', GoalsController.list);
  app.get('/:id', GoalsController.get);
  app.post('/', GoalsController.create);
  app.put('/:id', GoalsController.update);
  app.delete('/:id', GoalsController.remove);
}
