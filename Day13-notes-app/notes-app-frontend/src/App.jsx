import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/notes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(API).then(res => res.json()).then(setNotes);
  }, []);

  const saveNote = async () => {
    if (!title || !content) return;

    if (editId) {
      const res = await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      setNotes(notes.map(n => n._id === data._id ? data : n));
      setEditId(null);
    } else {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      setNotes([...notes, data]);
    }
    setTitle("");
    setContent("");
  };

  const deleteNote = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setNotes(notes.filter(n => n._id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      {/* Card */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">📝 Notes App</h2>

        {/* Form - vertical align */}
        <div className="flex flex-col gap-4 mb-6">
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          <button
            onClick={saveNote}
            className="mx-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            {editId ? "Update Note" : "Add Note"}
          </button>
        </div>

        {/* Notes List */}
        <ul className="space-y-3">
          {notes.map(note => (
            <li
              key={note._id}
              className="flex justify-between items-center bg-gray-700 p-3 rounded-md"
            >
              <div>
                <b>{note.title}</b>
                <p className="text-sm text-gray-300">{note.content}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditId(note._id); setTitle(note.title); setContent(note.content); }}
                  className="text-yellow-400 hover:text-yellow-500"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="text-red-400 hover:text-red-500"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
