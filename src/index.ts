import { buildServer } from './core/server';
import { config } from './core/config';
const start = async () => { const server = buildServer(); try { await server.listen({ port: config.PORT, host: '0.0.0.0' }); console.log('Server running on port', config.PORT); } catch (err) { server.log.error(err); process.exit(1); } };
start();
