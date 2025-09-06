# Auth App (React + Tailwind + Express + MongoDB + JWT)

## Folder structure
```
auth-app/
 ├── backend/   # Express API (register, login, protected)
 └── frontend/  # React + Vite + Tailwind UI
```

## Quick start
### 1) Backend
```bash
cd backend
npm install
cp .env.example .env   # optional
npm run dev            # or: npm start
# Server: http://localhost:5000
```
Make sure MongoDB is running locally (default URI is `mongodb://127.0.0.1:27017/authDB`).

### 2) Frontend
```bash
cd ../frontend
npm install
npm run dev
# App: http://localhost:5173
```

### Flow
- Register → Login → Token saved in localStorage → Visit Dashboard (protected)
- Logout clears token
