---
applyTo: "tests/**/*.test.ts"
---

# Testing conventions

- Use Vitest with `describe` / `it` (no `test`)
- Use `supertest` to drive the Express app via `request(createApp())`
- One assertion concept per test
- Use `beforeEach` with `vi.resetAllMocks()` to isolate tests
- Mock service layers with `vi.mock('../src/services/<name>.service.js')`; never read real JSON files in tests
- Cast mock return values with `as never` when the type system fights you
- Test naming: `'should [behaviour] when [condition]'`
- For each endpoint, cover at minimum: one happy path + one error path (typically `404` or `400`)
- Place all tests in the top-level `tests/` folder, mirroring the route group structure (one file per route group)
