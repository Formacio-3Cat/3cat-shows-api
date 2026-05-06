import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { showsService } from '../src/services/shows.service.js';
import { episodesService } from '../src/services/episodes.service.js';

vi.mock('../src/services/shows.service.js');
vi.mock('../src/services/episodes.service.js');

const mockShow = {
  id: 'show-001',
  title: 'Test Show',
  original_title: null,
  description: 'Test',
  genre: 'series',
  channel: '3cat',
  rating: 8.0,
  total_seasons: 1,
  total_episodes: 2,
  language: 'ca',
  parental_rating: 'TP',
  poster_url: null,
};

const mockEpisodes = [
  {
    id: 'ep-0001',
    show_id: 'show-001',
    season_number: 1,
    episode_number: 1,
    title: 'Pilot',
    description: 'First episode',
    duration_min: 50,
    broadcast_date: '2024-01-15',
    available_until: null,
    has_subtitles: true,
    has_sign_language: false,
    has_audio_description: false,
  },
  {
    id: 'ep-0002',
    show_id: 'show-001',
    season_number: 1,
    episode_number: 2,
    title: 'Second',
    description: 'Second episode',
    duration_min: 50,
    broadcast_date: '2024-01-22',
    available_until: null,
    has_subtitles: true,
    has_sign_language: false,
    has_audio_description: false,
  },
];

describe('GET /shows/:id/episodes', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return paginated episodes when show exists', async () => {
    vi.mocked(showsService.findById).mockReturnValue(mockShow as never);
    vi.mocked(episodesService.findByShowId).mockReturnValue(mockEpisodes as never);

    const response = await request(createApp()).get('/shows/show-001/episodes');

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(2);
    expect(response.body.pagination.total).toBe(2);
  });

  it('should respect page and limit query parameters', async () => {
    vi.mocked(showsService.findById).mockReturnValue(mockShow as never);
    vi.mocked(episodesService.findByShowId).mockReturnValue(mockEpisodes as never);

    const response = await request(createApp()).get(
      '/shows/show-001/episodes?page=1&limit=1',
    );

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.pagination.limit).toBe(1);
    expect(response.body.pagination.total_pages).toBe(2);
  });

  it('should return 404 when show does not exist', async () => {
    vi.mocked(showsService.findById).mockReturnValue(null);

    const response = await request(createApp()).get('/shows/show-999/episodes');

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe('SHOW_NOT_FOUND');
  });
});