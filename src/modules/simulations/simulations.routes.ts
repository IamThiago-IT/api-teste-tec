import { FastifyInstance } from 'fastify';
import { prisma } from '../../core/database';
import { simulateWealthCurve } from '../../utils/projectionEngine';

export async function simulationsRoutes(app: FastifyInstance) {
  app.post('/run', async (req, reply) => {
    const { clientId, initialWealth = 0, rate = 4 } = req.body as any;
    const events = await prisma.event.findMany({ where: { clientId } });
    const proj = simulateWealthCurve(initialWealth, events, rate);
    const sim = await prisma.simulation.create({
      data: { clientId, rate, initialWealth, projections: proj as any }
    });
    return reply.send(sim);
  });

  app.get('/:clientId', async (req, reply) => {
    const clientId = (req.params as any).clientId;
    const sims = await prisma.simulation.findMany({ where: { clientId } });
    return reply.send(sims);
  });
}
