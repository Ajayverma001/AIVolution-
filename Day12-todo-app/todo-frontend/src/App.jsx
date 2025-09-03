import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch todos
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch(() => setError("Failed to load todos"))
      .finally(() => setLoading(false));
  }, []);

  const addTodo = async () => {
    const text = newTodo.trim();
    if (!text) return;
    try {
      const res = await fetch(`${API_BASE}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data?.error) throw new Error(data.error);
      setTodos((prev) => [...prev, data]);
      setNewTodo("");
    } catch (e) {
      setError(e.message || "Failed to add");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_BASE}/api/todos/${id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Failed to delete");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 640, margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
      <h1>✅ To-Do App</h1>
      <p style={{ opacity: 0.8, marginTop: -8 }}>React + Node (Vite + Express)</p>

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter task"
          style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd" }}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo} style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #222", cursor: "pointer" }}>
          Add
        </button>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", border: "1px solid #eee", borderRadius: 10, marginBottom: 8 }}>
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e11", cursor: "pointer" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 24, fontSize: 14, opacity: 0.8 }}>
        <p><strong>Tip:</strong> If your backend runs on a different URL, create a <code>.env</code> file with <code>VITE_API_URL=http://localhost:5000</code>.</p>
      </div>
    </div>
  );
}
