import { createApp } from './app.js';
import { logger } from './middleware/logger.js';

const PORT = parseInt(process.env.PORT ?? '3000', 10);

const app = createApp();

app.listen(PORT, () => {
  logger.info(`3Cat Shows API listening on port ${PORT}`);
});
