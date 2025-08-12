import { prisma } from '../../core/database';

export const GoalsService = {
  async listAll(clientId?: string) {
    return prisma.goal.findMany({ where: clientId ? { clientId } : {}, orderBy: { targetDate: 'asc' } });
  },

  async getById(id: string) {
    return prisma.goal.findUnique({ where: { id } });
  },

  async create(data: any) {
    return prisma.goal.create({ data });
  },

  async update(id: string, data: any) {
    return prisma.goal.update({ where: { id }, data });
  },

  async remove(id: string) {
    return prisma.goal.delete({ where: { id } });
  },
};
