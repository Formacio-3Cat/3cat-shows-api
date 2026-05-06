import type { Request, Response, NextFunction } from 'express';
import { showsService } from '../services/shows.service.js';

export const showsController = {
  list(_req: Request, res: Response, next: NextFunction): void {
    try {
      const shows = showsService.findAll();
      res.json({ data: shows });
    } catch (err) {
      next(err);
    }
  },

  getById(req: Request, res: Response, next: NextFunction): void {
    try {
      const { id } = req.params;
      const show = showsService.findById(id as string);

      if (!show) {
        res.status(404).json({
          error: { code: 'SHOW_NOT_FOUND', message: `Show ${id} not found` },
        });
        return;
      }

      res.json({ data: show });
    } catch (err) {
      next(err);
    }
  },
};
