import { FastifyRequest, FastifyReply } from 'fastify';
import { GoalsService } from './goals.service';
import { CreateGoalSchema, UpdateGoalSchema } from './goals.schema';

export const GoalsController = {
  async list(req: FastifyRequest<{ Querystring: { clientId?: string } }>, reply: FastifyReply) {
    const { clientId } = req.query as any;
    const goals = await GoalsService.listAll(clientId);
    return reply.send(goals);
  },

  async get(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = req.params as any;
    const goal = await GoalsService.getById(id);
    if (!goal) return reply.status(404).send({ message: 'Goal not found' });
    return reply.send(goal);
  },

  async create(req: FastifyRequest, reply: FastifyReply) {
    const parsed = CreateGoalSchema.parse(req.body);
    const goal = await GoalsService.create(parsed);
    return reply.status(201).send(goal);
  },

  async update(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = req.params as any;
    const parsed = UpdateGoalSchema.parse(req.body);
    try {
      const updated = await GoalsService.update(id, parsed);
      return reply.send(updated);
    } catch (err: any) {
      if (err.code === 'P2025') return reply.status(404).send({ message: 'Goal not found' });
      throw err;
    }
  },

  async remove(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = req.params as any;
    try {
      await GoalsService.remove(id);
      return reply.status(204).send();
    } catch (err: any) {
      if (err.code === 'P2025') return reply.status(404).send({ message: 'Goal not found' });
      throw err;
    }
  },
};
