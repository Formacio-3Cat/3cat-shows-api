import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { showsService } from '../src/services/shows.service.js';

vi.mock('../src/services/shows.service.js');

describe('GET /shows', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return all shows when called', async () => {
    const mockShows = [
      {
        id: 'show-001',
        title: 'Polònia',
        original_title: null,
        description: 'Test',
        genre: 'magazine',
        channel: '3cat',
        rating: 8.0,
        total_seasons: 1,
        total_episodes: 10,
        language: 'ca',
        parental_rating: 'TP',
        poster_url: null,
      },
    ];
    vi.mocked(showsService.findAll).mockReturnValue(mockShows as never);

    const response = await request(createApp()).get('/shows');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: mockShows });
  });
});

describe('GET /shows/:id', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return the show when id exists', async () => {
    const mockShow = {
      id: 'show-001',
      title: 'Polònia',
      original_title: null,
      description: 'Test',
      genre: 'magazine',
      channel: '3cat',
      rating: 8.0,
      total_seasons: 1,
      total_episodes: 10,
      language: 'ca',
      parental_rating: 'TP',
      poster_url: null,
    };
    vi.mocked(showsService.findById).mockReturnValue(mockShow as never);

    const response = await request(createApp()).get('/shows/show-001');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: mockShow });
  });

  it('should return 404 when show does not exist', async () => {
    vi.mocked(showsService.findById).mockReturnValue(null);

    const response = await request(createApp()).get('/shows/show-999');

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe('SHOW_NOT_FOUND');
  });

  it('should return 400 when id format is invalid', async () => {
    const response = await request(createApp()).get('/shows/invalid-id');

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
