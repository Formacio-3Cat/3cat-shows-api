import { Router } from 'express';
import { param } from 'express-validator';
import { showsController } from '../controllers/shows.controller.js';
import { handleValidation } from '../middleware/handle-validation.js';

const router = Router();

router.get('/', showsController.list);

router.get(
  '/:id',
  [param('id').isString().notEmpty().matches(/^show-\d+$/)],
  handleValidation,
  showsController.getById,
);

export { router as showsRouter };
