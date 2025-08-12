import { FastifyInstance } from 'fastify';
import { prisma } from '../../core/database';

export async function eventsRoutes(app: FastifyInstance) {
  app.get('/:clientId', async (req, reply) => {
    const clientId = (req.params as any).clientId;
    const events = await prisma.event.findMany({ where: { clientId } });
    return reply.send(events);
  });
}
