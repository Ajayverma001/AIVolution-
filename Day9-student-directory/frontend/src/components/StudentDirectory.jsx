import { useEffect, useState } from "react";

export default function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const fetchStudents = () => {
    fetch("http://localhost:5000/api/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, course }),
    });
    setName("");
    setCourse("");
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await fetch(`http://localhost:5000/api/students/${id}`, {
      method: "DELETE",
    });
    fetchStudents();
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">🎓 Student Directory</h2>

      <form onSubmit={addStudent} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded flex-1"
          required
        />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="border p-2 rounded flex-1"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          Add
        </button>
      </form>

      <ul className="space-y-3">
        {students.map((student) => (
          <li
            key={student.id}
            className="flex justify-between items-center border p-3 rounded-lg shadow-sm"
          >
            <span>
              <strong>{student.name}</strong> - {student.course}
            </span>
            <button
              onClick={() => deleteStudent(student.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}