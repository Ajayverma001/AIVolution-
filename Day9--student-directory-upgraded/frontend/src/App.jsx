import { useState, useEffect } from "react";

export default function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch students
  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  // Add or Update student
  const saveStudent = async (e) => {
    e.preventDefault();
    if (!name || !course) return;

    if (editingId) {
      // Update Student
      const res = await fetch(`http://localhost:5000/api/students/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, course }),
      });
      const updatedStudent = await res.json();
      setStudents(
        students.map((s) => (s.id === editingId ? updatedStudent : s))
      );
      setEditingId(null);
    } else {
      // Add Student
      const res = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, course }),
      });
      const newStudent = await res.json();
      setStudents([...students, newStudent]);
    }

    setName("");
    setCourse("");
  };

  // Delete student
  const deleteStudent = async (id) => {
    await fetch(`http://localhost:5000/api/students/${id}`, {
      method: "DELETE",
    });
    setStudents(students.filter((s) => s.id !== id));
  };

  // Start editing
  const editStudent = (student) => {
    setName(student.name);
    setCourse(student.course);
    setEditingId(student.id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">🎓 Student Directory</h1>

      {/* Add / Update Student Form */}
      <form
        onSubmit={saveStudent}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "✏️ Update Student" : "➕ Add New Student"}
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          {editingId ? "✅ Update" : "➕ Add Student"}
        </button>
      </form>

      {/* Student List */}
      <div className="grid gap-4 w-full max-w-2xl">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white p-4 shadow rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold text-gray-700">{student.name}</p>
              <p className="text-gray-500">{student.course}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => editStudent(student)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteStudent(student.id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
