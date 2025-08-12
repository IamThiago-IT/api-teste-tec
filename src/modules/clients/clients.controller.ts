import { FastifyRequest, FastifyReply } from 'fastify';
import { ClientsService } from './clients.service';
import { CreateClientSchema, UpdateClientSchema } from './clients.schema';

export const ClientsController = {
  async list(req: FastifyRequest, reply: FastifyReply) {
    const clients = await ClientsService.listAll();
    return reply.send(clients);
  },

  async get(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = req.params as any;
    const client = await ClientsService.getById(id);
    if (!client) return reply.status(404).send({ message: 'Client not found' });
    return reply.send(client);
  },

  async create(req: FastifyRequest, reply: FastifyReply) {
    const parsed = CreateClientSchema.parse(req.body);
    const exists = await ClientsService.findByEmail(parsed.email);
    if (exists) return reply.status(409).send({ message: 'Email already registered' });
    const client = await ClientsService.create(parsed);
    return reply.status(201).send(client);
  },

  async update(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = req.params as any;
    const parsed = UpdateClientSchema.parse(req.body);
    try {
      const updated = await ClientsService.update(id, parsed);
      return reply.send(updated);
    } catch (err: any) {
      if (err.code === 'P2025') return reply.status(404).send({ message: 'Client not found' });
      throw err;
    }
  },

  async remove(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = req.params as any;
    try {
      await ClientsService.remove(id);
      return reply.status(204).send();
    } catch (err: any) {
      if (err.code === 'P2025') return reply.status(404).send({ message: 'Client not found' });
      throw err;
    }
  },
};
