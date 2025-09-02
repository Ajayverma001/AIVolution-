const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Temporary student data (in-memory)
let students = [
  { id: 1, name: "Ajay Verma", age: 20 },
  { id: 2, name: "Neha Sharma", age: 22 },
];

// ✅ GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// ✅ GET student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

// ✅ POST - Add new student
app.post("/students", (req, res) => {
  const { name, age } = req.body;
  const newStudent = { id: students.length + 1, name, age };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// ✅ PUT - Update student
app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });

  const { name, age } = req.body;
  student.name = name || student.name;
  student.age = age || student.age;

  res.json(student);
});

// ✅ DELETE - Remove student
app.delete("/students/:id", (req, res) => {
  students = students.filter(s => s.id !== parseInt(req.params.id));
  res.json({ message: "Student deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
