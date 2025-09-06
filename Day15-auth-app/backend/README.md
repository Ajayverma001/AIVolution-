# Backend (Express + MongoDB + JWT)

## Setup
```bash
cd backend
npm install
# optional: create a .env (see .env.example)
npm run dev    # or: npm start
```

- Server: http://localhost:5000
- Health check: `GET /health`
- Register: `POST /api/auth/register` { email, password }
- Login: `POST /api/auth/login` { email, password }
- Protected: `GET /api/protected` with header `Authorization: Bearer <token>`
