<!-- .github/copilot-instructions.md - guidance for AI coding agents working on this repo -->
# Assistant guidance for web-teacher-server

This repo is a small Node + Express + MongoDB example using ESM. The guidance below is focused and actionable so an AI agent can be immediately productive.

Key facts
- Entry point: `src/server.js` (package.json `main` and `start`/`dev` scripts).
- App factory pattern expected: `src/app.js` or similar should export an Express app so tests can import it without starting a listener.
- ESM is enabled via `"type": "module"` in `package.json`. Jest is run with `--experimental-vm-modules` and no transform (see `package.json` jest config).
- Tests: Jest + babel-jest (devDependencies). Integration tests use `supertest`. Mongoose is commonly mocked with `mockingoose` for unit tests.

What to do first (quick wins)
- Run: `npm run test` to execute unit tests (Jest). For development server: `npm run dev`.
- Look at `STYLE_GUIDE.md` for filename conventions: controllers (*.controller.js), services (*.service.js), models (*.model.js), routes (*.route.js), middleware (*.middleware.js), config (*.config.js).
- When adding or editing code, follow the role-suffix naming and keep controllers thin (call services only).

Repository-specific patterns to follow
- ESM imports/exports everywhere (no CommonJS). Keep default exports for primary file exports where the style guide suggests one primary export per file.
- Error handling: services throw Errors with a `status` property; the central `error.middleware.js` is expected to read `err.status` or default to 500.
- App vs server split: export the configured Express app from `app.js` and start listening in `server.js` to allow tests to import the app without launching the server.
- Environment variables: load via `dotenv` in configuration files. Do not commit `.env`; use `.env.example` for required keys.

Testing and test-run details
- Jest configuration is in `package.json`. Tests run under node ESM with `--experimental-vm-modules` and `extensionsToTreatAsEsm: ['.js']`.
- Use `mockingoose` to stub Mongoose models in unit tests; use `supertest` to exercise the Express app in integration tests.
- Tests typically live in a top-level `tests/` folder or alongside implementation files as `*.test.js`.

Files and locations to reference when coding or changing behavior
- `src/config/*` — database and env configuration patterns.
- `src/models/*.model.js` — Mongoose schema definitions and exported models.
- `src/services/*.service.js` — business logic; prefer adding new DB access here.
- `src/controllers/*.controller.js` — HTTP request/response mapping. Keep thin and call services.
- `src/routes/*.route.js` — Router wiring and middleware order.
- `src/middleware/error.middleware.js` — central error formatting (ensure `err.status` is honored).
- `src/app.js` and `src/server.js` — app factory and server bootstrap.

Common pitfalls for agents (explicit)
- Do not start the HTTP server in tests. Import the app (from `app.js`) and use `supertest` instead.
- Because this repo uses ESM + Jest, avoid relying on CommonJS-only test patterns; use async/await and ensure tests run under the `--experimental-vm-modules` flag.
- When writing tests that touch the database, prefer mocking Mongoose (mockingoose) rather than spinning up a real MongoDB instance.

Examples (copyable patterns found in this repo)
- Error throw in service:

  const err = new Error('Not Found');
  err.status = 404;
  throw err;

- Minimal controller shape:

  export default async function(req, res, next) {
    try {
      const result = await myService.doSomething(req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

When to ask the maintainer
- Any change to the test runner (jest flags, babel) — confirm CI expectations.
- Adding new top-level dependencies (especially native modules) — check whether they must be supported on the project's target Node version.

What I will not invent
- Do not assume runtime or CI details not present in the repo (e.g., specific GitHub Actions). If you need CI changes, ask the maintainer.

If you update this file
- Preserve above key facts and examples. Merge changes conservatively; keep the short quick-run commands and the mapping of filenames to responsibilities.

End of assistant guidance.
