import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui'
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { config } from './config';
import { clientRoutes } from '../modules/clients/clients.routes';
import { goalsRoutes } from '../modules/goals/goals.routes';
import { walletRoutes } from '../modules/wallet/wallet.routes';
import { eventsRoutes } from '../modules/events/events.routes';
import { simulationsRoutes } from '../modules/simulations/simulations.routes';
import { suggestionsRoutes } from '../modules/suggestions/suggestions.routes';
import { importRoutes } from '../modules/import/import.routes';
import { authRoutes } from '../modules/auth/auth.routes';

type BuildOptions = {
  logger?: boolean;
  enableDocs?: boolean;
};

export const buildServer = (opts: BuildOptions = {}) => {
  const app = Fastify({ logger: opts.logger ?? true });

  app.register(cors);
  if (opts.enableDocs ?? true) {
    app.register(swagger, { 
      openapi:{
        info:{title: 'Api',   description: 'teste', version: '1.0.0'}
      }
    });
  }
  app.register(jwt, { secret: config.JWT_SECRET });
  if (opts.enableDocs ?? true) {
    app.register(swaggerUI, { routePrefix: '/docs' });
  }

  // register routes
  app.register(clientRoutes, { prefix: '/clients' });
  app.register(goalsRoutes, { prefix: '/goals' });
  app.register(walletRoutes, { prefix: '/wallet' });
  app.register(eventsRoutes, { prefix: '/events' });
  app.register(simulationsRoutes, { prefix: '/simulations' });
  app.register(suggestionsRoutes, { prefix: '/suggestions' });
  app.register(importRoutes, { prefix: '/import' });
  app.register(authRoutes, { prefix: '/auth' });

  return app;
};
