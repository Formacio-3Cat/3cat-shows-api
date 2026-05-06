# Project: 3Cat Shows API

## What this is
REST API minimal serving 3Cat's shows catalog and their episodes. Used as the training repository for GitHub Copilot Enterprise workshops at 3Cat.

## Tech stack
- Node.js 20+, Express 4.x, TypeScript 5.7
- Vitest + supertest for tests
- express-validator for input validation
- pino + pino-http for structured logging

## Coding conventions
- Use `import` (ESM), not `require`
- Always type function signatures explicitly (avoid `any`)
- Prefer `const` over `let`; never `var`
- Use named exports, not default exports
- Async logic inside `try/catch`; pass errors to `next(err)`
- Domain types live in `src/types.ts`; do not duplicate them

## Project structure
- `src/routes/` — Express route definitions, validators inline
- `src/controllers/` — Business logic (called by routes)
- `src/services/` — Data access (mock JSON loaders)
- `src/middleware/` — Cross-cutting concerns (validation, errors, logging)
- `src/data/` — Static JSON datasets (`shows.json`, `episodes.json`)
- `tests/` — Vitest tests, one file per route group

## Scripts
- `npm run dev` — start with hot reload (tsx watch)
- `npm test` — run all Vitest tests once
- `npm run lint` — ESLint over `src` and `tests`
- `npm run build` — compile TypeScript to `dist/`

## Domain model
- A `Show` is a programme (e.g. Polònia, Merlí). IDs follow `show-NNN`.
- An `Episode` belongs to a single show. IDs follow `ep-NNNN`.
- Field names follow EPG (Electronic Programme Guide) conventions where possible.

## What NOT to do
- Do not introduce a real database; this is a mock-data API by design.
- Do not add authentication middleware; out of scope for this training repo.
- Do not add new top-level dependencies without updating this file.
