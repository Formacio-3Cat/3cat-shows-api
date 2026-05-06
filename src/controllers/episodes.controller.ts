import type { Request, Response, NextFunction } from 'express';
import { showsService } from '../services/shows.service.js';
import { episodesService } from '../services/episodes.service.js';
import type { PaginatedResponse, Episode } from '../types.js';

export const episodesController = {
  /**
   * GET /shows/:id/episodes
   * Lists episodes for a show with pagination.
   */
  listByShow(req: Request, res: Response, next: NextFunction): void {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 20;

      const show = showsService.findById(id as string);
      if (!show) {
        res.status(404).json({
          error: { code: 'SHOW_NOT_FOUND', message: `Show ${id} not found` },
        });
        return;
      }

      const allEpisodes = episodesService.findByShowId(id as string);
      const total = allEpisodes.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginated = allEpisodes.slice(start, end);

      const response: PaginatedResponse<Episode> = {
        data: paginated,
        pagination: { page, limit, total, total_pages: totalPages },
      };

      res.json(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /shows/:id/episodes
   * Creates a new episode for a show.
   * NOTE: in a real backend this would persist; here we just validate and return 201.
   */
  create(req: Request, res: Response, next: NextFunction): void {
    try {
      const { id } = req.params;
      const show = showsService.findById(id as string);

      if (!show) {
        res.status(404).json({
          error: { code: 'SHOW_NOT_FOUND', message: `Show ${id} not found` },
        });
        return;
      }

      const {
        season_number,
        episode_number,
        title,
        description,
        duration_min,
        broadcast_date,
      } = req.body;

      // Build the new episode (mock — would be persisted in a real app)
      const newEpisode: Episode = {
        id: `ep-${Date.now()}`,
        show_id: id as string,
        season_number,
        episode_number,
        title,
        description,
        duration_min,
        broadcast_date,
        available_until: null,
        has_subtitles: false,
        has_sign_language: false,
        has_audio_description: false,
      };

      res.status(201).json({ data: newEpisode });
    } catch (err) {
      next(err);
    }
  },
};
