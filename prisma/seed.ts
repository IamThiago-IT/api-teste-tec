import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'advisor@example.com' },
    update: {},
    create: {
      email: 'advisor@example.com',
      password: '$2b$10$abcdefghijklmnopqrstuv',
      role: 'advisor',
    },
  });
  const client = await prisma.client.create({
    data: {
      name: 'Cliente Demo',
      email: 'cliente@demo.com',
      age: 40,
      familyProfile: 'Casal',
      goals: { create: [{ title: 'Aposentadoria', targetValue: 1000000, targetDate: new Date('2045-01-01') }] },
      wallet: { create: [{ class: 'Renda fixa', percentage: 60, totalWealth: 500000 }] },
    },
    include: { goals: true },
  });
  console.log('Seed feito', client.id);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => process.exit());
