import { FastifyInstance } from 'fastify';
import { prisma } from '../../core/database';

export async function walletRoutes(app: FastifyInstance) {
  app.get('/:clientId', async (req, reply) => {
    const clientId = (req.params as any).clientId;
    const wallets = await prisma.wallet.findMany({ where: { clientId } });
    return reply.send(wallets);
  });
}
