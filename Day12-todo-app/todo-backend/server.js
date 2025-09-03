import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory DB
let todos = [
  { id: 1, text: "Learn React" },
  { id: 2, text: "Build a To-Do App" },
];

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Add todo
app.post("/api/todos", (req, res) => {
  const text = (req.body?.text || "").trim();
  if (!text) return res.status(400).json({ error: "text is required" });
  const newTodo = { id: Date.now(), text };
  todos.push(newTodo);
  res.json(newTodo);
});

// Delete todo
app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = todos.length;
  todos = todos.filter((t) => t.id !== id);
  const deleted = before !== todos.length;
  res.json({ deleted });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
