import { FastifyInstance } from 'fastify';
import { importEmitter, processClientsCsv } from './import.service';
import multipart from '@fastify/multipart';

export async function importRoutes(app: FastifyInstance) {
  // register multipart to accept file uploads
  app.register(multipart);

  app.post('/clients', async (req, reply) => {
    const data = await (req as any).file();
    if (!data) return reply.status(400).send({ message: 'No file' });
    const buf = await data.toBuffer();
    // start processing in background (don't block request)
    processClientsCsv(buf).catch(err => {
      importEmitter.emit('error', { error: String(err) });
    });
    return reply.status(202).send({ message: 'Import started' });
  });

  // SSE endpoint for progress
  app.get('/progress', async (req, reply) => {
    // set headers for SSE
    reply.raw.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    reply.raw.setHeader('Cache-Control', 'no-cache');
    reply.raw.setHeader('Connection', 'keep-alive');
    reply.raw.flushHeaders();

    const onProgress = (payload: any) => {
      reply.raw.write(`event: progress\n`);
      reply.raw.write(`data: ${JSON.stringify(payload)}\n\n`);
    };
    const onDone = (payload: any) => {
      reply.raw.write(`event: done\n`);
      reply.raw.write(`data: ${JSON.stringify(payload)}\n\n`);
      // close connection after done
      reply.raw.end();
    };
    const onError = (payload: any) => {
      reply.raw.write(`event: error\n`);
      reply.raw.write(`data: ${JSON.stringify(payload)}\n\n`);
    };

    importEmitter.on('progress', onProgress);
    importEmitter.once('done', onDone);
    importEmitter.once('error', onError);

    // cleanup when client disconnects
    req.raw.on('close', () => {
      importEmitter.off('progress', onProgress);
      importEmitter.off('error', onError);
    });

    // keep request open
    return reply;
  });
}
