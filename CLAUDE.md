# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run development server (TypeScript directly via tsx)
npx tsx src/server.ts

# Run the demo/test script
npx tsx src/index.ts

# Compile TypeScript to dist/
npx tsc

# Install dependencies
npm install
```

No linter or test framework is configured.

## Architecture

MVC-style Express API for managing service orders (Portuguese-language domain: ordens de serviço).

**Data flow:**
- `src/server.ts` — Express app setup and entry point; currently only has `/health` endpoint
- `src/routes/serviceOrder.routes.ts` — Route definitions (currently empty, not yet wired to server)
- `src/controllers/serviceOrder.controller.ts` — HTTP handlers: create, getAll, updateStatus, delete
- `src/services/serviceOrder.service.ts` — Business logic and **in-memory array storage** (data resets on restart)
- `src/types/serviceOrder.ts` — Shared TypeScript types/interfaces

**Incomplete wiring:** The routes file is empty and `server.ts` does not import routes. The controllers exist and work, but the HTTP layer connecting routes → controllers → server is not yet implemented.

**Key types** (`src/types/serviceOrder.ts`):
- `ServiceOrder` — full entity with `id`, `code`, `clientName`, `description`, `status`, `createdAt`
- `ServiceOrderStatus` — union: `"OPEN" | "IN_PROGRESS" | "DONE" | "CANCELED"`
- `ServiceOrderPick` — creation DTO (subset of ServiceOrder)
- `UpdateStatusPick` — update DTO for status changes

**Environment:** Port configured via `.env` → `PORT=3000`.

**Module system:** `package.json` sets `"type": "module"` (ESM), but `tsconfig.json` compiles to `commonjs` — keep this tension in mind when adding imports.
