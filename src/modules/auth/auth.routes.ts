import { FastifyInstance } from 'fastify';
import { prisma } from '../../core/database';
import bcrypt from 'bcrypt';

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', async (req, reply) => {
    const { email, password } = req.body as any;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return reply.status(401).send({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return reply.status(401).send({ message: 'Invalid credentials' });
    const token = app.jwt.sign({ sub: user.id, role: user.role });
    return reply.send({ token });
  });
}
