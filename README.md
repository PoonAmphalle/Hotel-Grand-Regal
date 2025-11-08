# Hotel Grand Regal — MERN

A semi-dynamic hotel website built with MongoDB, Express.js, React.js, and Node.js.

## Features
- Static pages: Home, About, Contact, Banquet
- Dynamic pages: Dining and Rooms (data from MongoDB)
- Admin panel: Login, Manage Menu and Rooms (add/edit/delete)
- Images from React public folder (`frontend/public/images`)

## Tech
- Frontend: React (CRA), React Router
- Backend: Express, Mongoose, JWT auth
- Database: MongoDB

---

## Local development

1) Prerequisites
- Node.js 18+
- MongoDB (local) or Docker if using docker-compose

2) Backend
```bash
cd backend
cp .env.example .env   # if present, otherwise create .env with vars below
# .env values
# PORT=5000
# MONGODB_URI=mongodb://127.0.0.1:27017/hotelGrandRegal
# JWT_SECRET=change_me
# CORS_ORIGIN=http://localhost:3000
npm install
npm run dev
```

3) Frontend
```bash
cd frontend
npm install
# For local dev CRA proxy will forward /api to http://localhost:5000
npm start
```

4) Seed data (optional)
```bash
cd backend
npm run seed        # insert sample admin/menu/rooms if empty
npm run seed:reset  # clear menu/rooms, then insert samples
```

Admin login
- email: admin@grandregal.com
- password: Admin@123

---

## Docker (one command)

```bash
docker compose up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- MongoDB: localhost:27017 (volume persisted)

The frontend is built with `REACT_APP_API_BASE=http://localhost:5000/api` so it talks to the backend directly.

---

## Project structure
```
root/
  backend/
    src/
      models/ (Room, MenuItem, User)
      controllers/ (rooms, menu, auth)
      routes/ (rooms, menu, auth)
      middleware/ (auth)
      index.js
      seed.js
    Dockerfile
  frontend/
    public/images
    src/
      pages/ (customer, admin, common)
      components/
      api/axios.js
    Dockerfile
  docker-compose.yml
  README.md
```

---

## Notes
- Images: use public paths like `/images/dish1.jpg`.
- Admin endpoints require Authorization: `Bearer <token>`.
- Dining page normalizes image URLs (public path or backend-served URLs).

---

## Docker cheat sheet

Common commands from project root:

```bash
# build and start
docker compose up -d --build

# status and logs
docker compose ps
docker compose logs -f backend
docker compose logs -f frontend

# seed and reset data
docker compose exec backend npm run seed
docker compose exec backend npm run seed:reset

# rebuild a single service
docker compose build frontend
docker compose up -d

# stop all
docker compose down
```

## Troubleshooting

- 404 on direct route (e.g., `/dining`): Nginx SPA fallback is configured via `frontend/nginx.conf`.
- Port 5000 already in use: `netstat -ano | findstr :5000` → `taskkill /PID <PID> /F`, then `docker compose up -d`.
- Login fails: ensure credentials `admin@grandregal.com` / `Admin@123` and no spaces; hard refresh; clear `localStorage`.
- Backend env: managed via `backend/.env` (see `.env.example`). Compose uses `env_file` to inject variables.
