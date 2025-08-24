# Task Management System (React + Express + MySQL)

Complete web app meeting the spec: JWT auth, tasks CRUD, categories, filters, basic analytics, validation, and Docker setup.

## Quick start (local dev)

### 1) Server
```bash
cd server
cp .env.example .env
# set DB credentials (match your local MySQL or docker compose)
npm install
npm run dev
```
To seed demo data:
```bash
npm run seed
# demo user: demo@example.com / password123
```

### 2) Client
```bash
cd ../client
npm install
npm run dev
```

## Docker (one command)
```bash
docker compose up --build
```
- MySQL → localhost:3306 (root/your_mysql_password)
- API → http://localhost:5000
- Web → http://localhost:5173

## MySQL schema
See `server/schema.sql` (DDL) if you prefer manual setup.

## API Endpoints
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/tasks — query: status, category, q, page, pageSize
- POST /api/tasks
- GET /api/tasks/:id
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- GET /api/categories
- POST /api/categories
- DELETE /api/categories/:id

## Notes
- Server validation via express-validator, secure password hashing (bcrypt), JWT auth middleware.
- Ownership checks: users only access their own categories and tasks.
- Environment variables keep secrets out of code.
- Logging via morgan.
