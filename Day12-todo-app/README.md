# To-Do App (Full Stack)

This project contains a simple To-Do app with:
- `todo-backend/` — Node.js + Express API
- `todo-frontend/` — React + Vite UI

## Run Backend + Frontend together

1. Install dependencies (root + subfolders):
```bash
cd todo-app
npm install         # installs concurrently at root
cd todo-backend && npm install
cd ../todo-frontend && npm install
cd ..
```

2. Start both backend and frontend with one command:
```bash
npm start
```

- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:5173

## Run Separately

- Backend:
  ```bash
  cd todo-backend
  npm install
  npm start
  ```

- Frontend:
  ```bash
  cd todo-frontend
  npm install
  npm run dev
  ```

## Custom API URL

If your backend runs on a different URL, create a `.env` file inside `todo-frontend`:
```
VITE_API_URL=http://localhost:5000
```
