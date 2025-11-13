<!-- Copied/created by an automated assistant. Edit as needed. -->
# Copilot instructions for Hotel-Grand-Regal

This file gives concise, actionable information an AI coding assistant needs to be productive in this repo.

- Project: MERN (Create React App frontend + Express/Mongoose backend + MongoDB)
- Services: `frontend`, `backend`, `mongo` (see `docker-compose.yml`)

Key places to look
- Backend entry & scripts: `backend/package.json` (start/dev/seed scripts) and `backend/src/index.js`.
- Backend env: `backend/.env.example` → compose uses `backend/.env` via `docker-compose.yml` `env_file`.
- Seed + default admin: `backend/src/seed.js` (creates `admin@grandregal.com` / `Admin@123`).
- Auth middleware: `backend/src/middleware/authMiddleware.js` (protect, admin helpers).
- Routes: `backend/src/routes/*` — check which routes use `protect`/`admin` to enforce auth.
- Frontend API helper: `frontend/src/api/axios.js` (uses `REACT_APP_API_BASE || /api`; attaches token from `localStorage`).
- Frontend proxy (dev): `frontend/package.json` has `proxy: "http://localhost:5000"` so `/api` requests are forwarded in dev.
- Static images used by seed and frontend: `frontend/public/images/*` (seed references `/images/...`).

Big-picture architecture & data flow (short)
- The frontend (CRA) talks to backend REST endpoints under `/api` (dev proxy or `REACT_APP_API_BASE`).
- Backend exposes routes in `backend/src/routes` and controllers in `backend/src/controllers`. Models live in `backend/src/models` (Mongoose).
- MongoDB is either local or provided by `docker-compose` service `mongo`. The compose file maps ports and volumes.

Developer workflows & important commands (copy-paste friendly)
- Local backend (node):
  - cd backend; npm install; npm run dev  (nodemon on `src/index.js`)
  - seed data: `npm run seed` or `npm run seed:reset` (run from `backend`)
- Local frontend (CRA):
  - cd frontend; npm install; npm start
- Docker (recommended single-step dev):
  - From repo root (Windows PowerShell):
    - Correct: `docker compose up -d --build`
    - If you see `no such service: –d` that means a non-ASCII dash was used (an en‑dash or em‑dash). Re-type using ASCII hyphen-minus (`-`) and try again.
    - Common commands: `docker compose ps`, `docker compose logs -f backend`, `docker compose exec backend npm run seed`, `docker compose down`.

Project-specific conventions & notes (discoverable patterns)
- Tokens: frontend saves JWT in `localStorage` as `token`; `frontend/src/api/axios.js` adds `Authorization: Bearer <token>` header.
- Admin credentials: seeded default admin is `admin@grandregal.com` / `Admin@123` (see `backend/src/seed.js`). Use these for admin UI flows.
- Routes protection: Not all controllers automatically enforce `protect`/`admin` — check `backend/src/routes/*` to know whether a route is protected.
- Images: seed uses public paths like `/images/dish1.jpg`. In production the front-end serves those assets; verify URLs in `frontend/public/images`.

Integration points & external dependencies
- MongoDB: Compose service `mongo:6` (exposed at 27017). In `.env.example` the backend default uses `mongodb://mongo:27017/hotelGrandRegal` for Docker.
- Build-time REACT_APP_API_BASE: `docker-compose.yml` passes `REACT_APP_API_BASE=http://localhost:5000/api` as a build arg for the frontend image.
- External NPM libs of note: `jsonwebtoken`, `mongoose`, `axios`, `react-router-dom`, `react-bootstrap`.

Patterns & quick examples
- To check whether an API endpoint requires auth: open `backend/src/routes/<resource>Routes.js` and look for `protect` or `admin` imports and usage.
  - Example: `backend/src/routes/authRoutes.js` uses `protect` on `GET /me`.
- To change API base used by frontend in Docker builds: update `REACT_APP_API_BASE` build arg in `docker-compose.yml` or update `.env` in `frontend` before building.

When modifying or adding APIs
- Update controller in `backend/src/controllers/*`, wire route in `backend/src/routes/*`, then ensure the frontend `api` calls the correct path (check `frontend/src/api/axios.js`).
- Run seed only when initial data is needed: `cd backend && npm run seed` or via compose `docker compose exec backend npm run seed`.

What NOT to assume
- Do not assume all write routes are protected — explicitly verify `protect`/`admin` usage.
- Don’t assume the frontend always uses `REACT_APP_API_BASE`; in dev it falls back to `proxy` in `frontend/package.json`.

If you need more context or examples, tell me which area (frontend, backend, docker) to expand and I will update this file.
