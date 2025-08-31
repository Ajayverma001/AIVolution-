import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Dummy in-memory DB
let students = [
  { id: 1, name: "Ajay Verma", course: "CS" },
  { id: 2, name: "Riya Sharma", course: "IT" },
  { id: 3, name: "Aman Gupta", course: "ECE" }
];

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Student Backend is running! Use /api/students to fetch data.");
});

// ✅ Get all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// ✅ Add new student
app.post("/api/students", (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({ error: "Name and course are required" });
  }

  const newStudent = { id: Date.now(), name, course };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// ✅ Update student by ID (PUT)
app.put("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, course } = req.body;

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  student.name = name || student.name;
  student.course = course || student.course;

  res.json(student);
});

// ✅ Delete student by ID
app.delete("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students.splice(studentIndex, 1);
  res.json({ message: "Deleted successfully" });
});

// ✅ Start server
app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
});
