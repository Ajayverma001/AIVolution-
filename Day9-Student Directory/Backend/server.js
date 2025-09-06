const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Dummy student data
let students = [
  { id: 1, name: "Ajay Verma", course: "B.Tech 3nd Year" },
  { id: 2, name: "Rahul Sharma", course: "MBA" },
  { id: 3, name: "Neha Singh", course: "MCA" }
];

// GET all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// Add a student
app.post("/api/students", (req, res) => {
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  res.json(newStudent);
});

// Delete a student
app.delete("/api/students/:id", (req, res) => {
  const { id } = req.params;
  students = students.filter(s => s.id != id);
  res.json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
