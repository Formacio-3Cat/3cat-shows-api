# 3Cat Shows API

API d'exemple per a la formació **GitHub Copilot Enterprise** amb 3Cat.

API REST minimal que serveix el catàleg de programes de 3Cat (shows) i els seus episodis, amb camps inspirats en l'estructura EPG (Electronic Programme Guide) real.

## Stack

- Node.js 20+
- Express 4
- TypeScript 5
- Vitest (tests)
- Pino (logging)
- express-validator (validació d'inputs)

## Estructura

```
src/
├── routes/         Definició d'endpoints Express
├── controllers/    Business logic
├── services/       Accés a dades (mock JSON)
├── middleware/     Validació, error handling, logging
├── data/           Dataset mock (programmes.json, episodes.json)
├── types.ts        Tipus de domini compartits
├── app.ts          Configuració de l'Express app
└── server.ts       Bootstrap del servidor

tests/              Tests Vitest (mirror de src/)
```

## Posada en marxa

```bash
npm install
npm run dev          # arranca a localhost:3000 amb hot reload
npm test             # corre tots els tests
npm run lint         # ESLint
```

## Endpoints

- `GET /shows` — Llista tots els programes
- `GET /shows/:id` — Detalla un programa
- `GET /shows/:id/episodes` — Llista episodis d'un programa (paginació amb `?page` i `?limit`)

## Per a la formació

Aquest repo conté:

- `.github/copilot-instructions.md` — instructions repo-wide
- `.github/instructions/*.instructions.md` — path-specific instructions (Bloc 1)
- `.github/skills/vitest-test-generator/` — skill simple (Bloc 2)
- `.github/agents/bitbucket-jira-pr-reviewer.agent.md` — agent (Bloc 2)
- `.vscode/mcp.json` — MCP servers per a Copilot a VS Code (Bloc 3)

Branques:
- `main` — repo base per al Bloc 1
- `skills-agents` — Skills i agents d'exemple pel Bloc 2

### Requisits per als servidors MCP

`.vscode/mcp.json` configura dos servidors:

- **`github`** — funciona directament, no requereix res instal·lat localment (és un servidor MCP HTTP).
- **`fetch`** — és un paquet Python oficial (`mcp-server-fetch`). S'executa amb `uvx`, així que cal instal·lar `uv` una sola vegada abans del Bloc 3:

| OS | Comanda |
|---|---|
| macOS | `brew install uv` |
| Windows | `winget install astral-sh.uv` (o `irm https://astral.sh/uv/install.ps1 \| iex`) |
| Linux | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |

Per verificar que `uv` està instal·lat: `uvx --version`. La primera vegada que Copilot arrenqui el servidor `fetch`, `uvx` descarregarà i cachejarà `mcp-server-fetch` automàticament (~5 s); les següents són instantànies.
