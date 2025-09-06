import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  // Fetch students on mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add student
  const addStudent = async () => {
    if (!name || !course) return alert("Enter all details!");
    const res = await axios.post("http://localhost:5000/api/students", { name, course });
    setStudents([...students, res.data]);
    setName("");
    setCourse("");
  };

  // Delete student
  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎓 Student Directory</h1>
      
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input 
          type="text" 
          placeholder="Course" 
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="border p-2 mr-2"
        />
        <button 
          onClick={addStudent} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul>
        {students.map(s => (
          <li key={s.id} className="flex justify-between border-b py-2">
            <span>{s.name} ({s.course})</span>
            <button 
              onClick={() => deleteStudent(s.id)} 
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
