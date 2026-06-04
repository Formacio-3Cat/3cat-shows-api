/**
 * Domain types for 3Cat Shows API.
 *
 * Field names are inspired by EPG (Electronic Programme Guide) standards
 * commonly used in DVB-SI metadata.
 */

export type ShowGenre =
  | 'series'
  | 'documentary'
  | 'magazine'
  | 'news'
  | 'sports'
  | 'kids'
  | 'movie';

export type Channel = '3cat' | 'super3' | '33' | 'esport3';

export interface Show {
  id: string;
  title: string;
  original_title: string | null;
  description: string;
  genre: ShowGenre;
  channel: Channel;
  rating: number; // 1-10
  total_seasons: number;
  total_episodes: number;
  language: 'ca' | 'es' | 'en';
  parental_rating: 'TP' | '+7' | '+12' | '+16' | '+18';
  poster_url: string | null;
}

export interface Episode {
  id: string;
  show_id: string;
  season_number: number;
  episode_number: number;
  title: string;
  description: string;
  duration_min: number;
  broadcast_date: string; // ISO 8601 date, e.g. "2026-04-15"
  available_until: string | null; // ISO 8601 date or null if always available
  has_subtitles: boolean;
  has_sign_language: boolean;
  has_audio_description: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
