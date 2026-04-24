import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// TEMP storage (later DB)
let sessions = [];

// Save workout
app.post("/save", (req, res) => {
  const data = req.body;

  const session = {
    id: Date.now(),
    exercise: data.exercise,
    reps: data.reps,
    duration: data.duration,
    date: new Date()
  };

  sessions.push(session);

  res.json({ message: "Saved", session });
});

// Get all sessions
app.get("/sessions", (req, res) => {
  res.json(sessions);
});

// Report summary
app.get("/report", (req, res) => {
  const totalReps = sessions.reduce((sum, s) => sum + s.reps, 0);

  res.json({
    totalSessions: sessions.length,
    totalReps
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});