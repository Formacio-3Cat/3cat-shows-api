---
name: vitest-test-generator
description: Generates Vitest tests for Express routes and controllers in this project, following 3Cat conventions (describe/it structure, vi.mock for services, naming "should X when Y", happy + error cases at minimum). Use this skill ALWAYS when adding or modifying API endpoints, controllers, or services and the corresponding tests are missing or incomplete. Use it BEFORE running tests to ensure coverage exists.
---

# Vitest test generator

This skill generates Vitest tests for the 3Cat Shows API. Use it whenever a controller or route lacks tests, or when an endpoint has been modified and the existing tests no longer cover the new behaviour.

## How to use

When invoked, you will:

1. **Inspect the target file** (controller, route, or service)
2. **Identify the endpoints / methods** that need tests
3. **Look at existing tests** in `tests/` for style and patterns
4. **Generate a new test file** (or extend an existing one) following the conventions below

## Conventions to follow

### File location and naming
- One test file per route group, in `tests/`
- Filename matches the route group: `episodes.test.ts` for `/shows/:id/episodes`

### Structure
- One `describe` block per endpoint (e.g. `describe('POST /shows/:id/episodes', ...)`)
- Inside, one `it` block per behaviour
- `beforeEach(() => { vi.resetAllMocks(); })` at the start of each `describe`

### Mocking
- ALWAYS mock service modules with `vi.mock('../src/services/<name>.service.js')`
- Use `vi.mocked(serviceName.method).mockReturnValue(...)` to set expectations
- NEVER read real JSON data in tests
- Cast with `as never` if TypeScript complains about partial mock objects

### Test naming
- Format: `'should [behaviour] when [condition]'`
- Examples:
  - `'should return 201 with new episode when payload is valid'`
  - `'should return 400 when season_number is missing'`
  - `'should return 404 when show does not exist'`

### Coverage minimum
For each endpoint, generate at least:
- **1 happy path** — valid input, expected success response
- **1 error path** — typically a `404` (resource not found) or `400` (validation failure)
- **For POST/PUT endpoints**: also test that `400` is returned for at least one missing required field

### What to assert
- HTTP status code: `expect(response.status).toBe(...)`
- Response body shape: `expect(response.body).toEqual({ ... })` for full match, or `expect(response.body.X).toBe(...)` for partial
- For error responses: assert the error code (`expect(response.body.error.code).toBe('VALIDATION_ERROR')`)

## Reference

See `tests/shows.test.ts` for a canonical example of these conventions in action.

## What NOT to do

- Do NOT use real DB or filesystem — always mock the service layer
- Do NOT use `test()`; always use `it()` for consistency
- Do NOT skip the "should X when Y" naming
- Do NOT generate trivial tests like `'should be defined'` — every test must verify a behaviour
