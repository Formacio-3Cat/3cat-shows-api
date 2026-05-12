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

---

## Skill / instruction transparency (MANDATORY)

This is a training repository. Learners must be able to **see** when a custom skill, instruction file, or agent is influencing your reply. Therefore:

### Activation banner — required on every reply

Every single reply MUST begin with an activation banner on its own line(s), in this exact format:

```
> 🧩 **Active context:** `<source-1>`, `<source-2>`, ...
```

- List every file under `.github/` whose guidance you applied to produce this reply.
- Use the file's `name` (from front-matter) when present; otherwise use the filename without extension.
- Categorise each entry with a prefix so the learner sees which mechanism fired:
  - `repo:` for this file (`copilot-instructions.md`) — always present
  - `instructions:` for any `.github/instructions/*.instructions.md` that auto-applied via its `applyTo` glob
  - `skill:` for any `.github/skills/<name>/SKILL.md` you invoked
  - `agent:` for any `.github/agents/*.agent.md` you are running as

Example:

```
> 🧩 **Active context:** `repo:copilot-instructions`, `instructions:routes`, `skill:vitest-test-generator`
```

If only the repo-wide instructions apply, the banner is still required:

```
> 🧩 **Active context:** `repo:copilot-instructions`
```

### Rules for the banner

- The banner is **the first content** in the reply — before any prose, plan, tool call summary, or code block.
- Never omit it, even for one-line answers, follow-ups, or clarifying questions.
- Never invent sources. Only list files you actually consulted or whose rules you applied. If you are unsure whether an instruction file applied, do **not** list it.
- Do not translate the banner — keep `Active context:` in English so it is grep-able across the workshop.
- The banner overrides any "be concise" instruction; conciseness applies to the rest of the reply, not to the banner.

### Self-check before sending

Before finalising any reply, re-read it and confirm:
1. The banner is present and is the first line.
2. Every source listed corresponds to a real file in `.github/`.
3. If you touched files matching an `applyTo` glob (e.g. you edited `src/routes/**`), the matching `instructions:` entry is included.
4. If you used a skill's steps (e.g. generated Vitest tests using the test-generator skill), the matching `skill:` entry is included.
