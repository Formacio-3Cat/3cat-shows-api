import { Router } from 'express';
import { param, query, body } from 'express-validator';
import { episodesController } from '../controllers/episodes.controller.js';
import { handleValidation } from '../middleware/handle-validation.js';

const router = Router({ mergeParams: true });

router.get(
  '/',
  [
    param('id').isString().notEmpty().matches(/^show-\d+$/),
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  ],
  handleValidation,
  episodesController.listByShow,
);

router.post(
  '/',
  [
    param('id').isString().notEmpty().matches(/^show-\d+$/),
    body('season_number').isInt({ min: 1 }),
    body('episode_number').isInt({ min: 1 }),
    body('title').isString().trim().notEmpty(),
    body('description').isString().trim().notEmpty(),
    body('duration_min').isInt({ min: 1, max: 300 }),
    body('broadcast_date').isISO8601({ strict: true }),
  ],
  handleValidation,
  episodesController.create,
);

export { router as episodesRouter };
