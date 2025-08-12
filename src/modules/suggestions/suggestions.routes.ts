import { FastifyInstance } from 'fastify';
import { SuggestionsService } from './suggestions.service';

export async function suggestionsRoutes(app: FastifyInstance) {
  app.get('/:clientId', async (req, reply) => {
    const clientId = (req.params as any).clientId;
    const suggestions = await SuggestionsService.suggestForGoal(clientId);
    if (!suggestions) return reply.status(404).send({ message: 'Client not found' });
    return reply.send(suggestions);
  });
}
