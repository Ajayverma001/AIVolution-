# Frontend (React + Vite + Tailwind + React Router)

## Setup
```bash
cd frontend
npm install
npm run dev
```
- Runs at: http://localhost:5173
- API base URL is set to `http://localhost:5000` in `src/api.js`

## Pages
- `/login` — Sign in, stores JWT in `localStorage`
- `/register` — Create account
- `/dashboard` — Protected route (requires token)
