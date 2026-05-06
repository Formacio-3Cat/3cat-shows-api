import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import type { Episode } from '../types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = resolve(__dirname, '..', 'data', 'episodes.json');

let cachedEpisodes: Episode[] | null = null;

function loadEpisodes(): Episode[] {
  if (cachedEpisodes === null) {
    const content = readFileSync(dataPath, 'utf-8');
    cachedEpisodes = JSON.parse(content) as Episode[];
  }
  return cachedEpisodes;
}

export const episodesService = {
  findByShowId(showId: string): Episode[] {
    const episodes = loadEpisodes();
    return episodes.filter((e) => e.show_id === showId);
  },

  // For tests
  _resetCache(): void {
    cachedEpisodes = null;
  },
};
