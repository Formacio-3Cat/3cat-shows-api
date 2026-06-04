import express from 'express';
import pinoHttp from 'pino-http';
import { showsRouter } from './routes/shows.routes.js';
import { episodesRouter } from './routes/episodes.routes.js';
import { errorHandler } from './middleware/error-handler.js';
import { logger } from './middleware/logger.js';

export function createApp(): express.Express {
  const app = express();

  app.use(express.json());
  app.use(pinoHttp({ logger }));

  // Routes
  app.use('/shows', showsRouter);
  app.use('/shows/:id/episodes', episodesRouter);

  // Error handler must be the last middleware
  app.use(errorHandler);

  return app;
}
