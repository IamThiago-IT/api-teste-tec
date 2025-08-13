import { PrismaClient } from '@prisma/client';

// Configuração para testes
const databaseUrl = process.env.DATABASE_URL || 'postgresql://planner:plannerpw@localhost:5432/plannerdb';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});
