# To-Do Backend (Node + Express)

## Setup
```bash
cd todo-backend
npm install
npm start
```

The server runs by default on `http://localhost:5000` with routes:
- `GET /api/todos`
- `POST /api/todos`  (body: `{ "text": "Task" }`)
- `DELETE /api/todos/:id`
