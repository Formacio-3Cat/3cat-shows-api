import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import type { Show } from '../types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = resolve(__dirname, '..', 'data', 'shows.json');

let cachedShows: Show[] | null = null;

function loadShows(): Show[] {
  if (cachedShows === null) {
    const content = readFileSync(dataPath, 'utf-8');
    cachedShows = JSON.parse(content) as Show[];
  }
  return cachedShows;
}

export const showsService = {
  findAll(): Show[] {
    return loadShows();
  },

  findById(id: string): Show | null {
    const shows = loadShows();
    return shows.find((s) => s.id === id) ?? null;
  },

  // For tests
  _resetCache(): void {
    cachedShows = null;
  },
};
