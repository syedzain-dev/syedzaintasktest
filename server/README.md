# Task Management System — Server (Express + Sequelize + MySQL)

## Setup
```bash
cp .env.example .env
# set DB credentials
npm install
npm run dev
```
### Env vars
- PORT
- JWT_SECRET
- DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS
- CLIENT_URL

### Scripts
- `npm run dev` — run server in watch mode
- `npm run seed` — reset DB and insert demo data

### API
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/tasks?status=&category=&q=&page=&pageSize=
- POST /api/tasks
- GET /api/tasks/:id
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- GET /api/categories
- POST /api/categories
- DELETE /api/categories/:id
