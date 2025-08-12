import { prisma } from '../../core/database';

export const ClientsService = {
  async listAll() {
    return prisma.client.findMany({ orderBy: { name: 'asc' } });
  },

  async getById(id: string) {
    return prisma.client.findUnique({ where: { id } });
  },

  async create(data: any) {
    return prisma.client.create({ data });
  },

  async update(id: string, data: any) {
    return prisma.client.update({ where: { id }, data });
  },

  async remove(id: string) {
    return prisma.client.delete({ where: { id } });
  },

  async findByEmail(email: string) {
    return prisma.client.findUnique({ where: { email } });
  },
};
