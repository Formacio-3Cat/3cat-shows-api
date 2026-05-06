---
applyTo: "src/routes/**"
---

# Route conventions

- Always use `express-validator` middleware for input validation (`param`, `query`, `body`)
- Pipe validators through the shared `handleValidation` middleware before the controller
- Return the appropriate HTTP status:
  - `400` for validation errors (handled by `handleValidation`)
  - `404` for not-found resources
  - `500` for unexpected errors (handled by `errorHandler`)
- Never put business logic in routes — delegate to a controller in `src/controllers/`
- IDs follow strict patterns: shows match `^show-\d+$`, episodes match `^ep-\d+$`
- Use `Router({ mergeParams: true })` for nested routers (so `:id` is available)
