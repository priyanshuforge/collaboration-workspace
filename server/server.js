import express from "express";
import cors from "cors";

const app = express();

const PORT = 5001;

app.use(cors());
app.use(express.json());

// Temporary notes database
let notes = [
  {
    id: 1,
    title: "Welcome to Workspace",
    content:
      "Start writing your ideas here. Create notes, format your text and collaborate with your team.",
    updatedAt: "Just now",
  },
];

// GET all notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// GET single note
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  const note = notes.find((note) => note.id === id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  res.json(note);
});

// CREATE note
app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;

  const newNote = {
    id: Date.now(),
    title: title || "Untitled Note",
    content: content || "",
    updatedAt: "Just now",
  };

  notes.unshift(newNote);

  res.status(201).json(newNote);
});

// UPDATE note
app.put("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  const noteIndex = notes.findIndex(
    (note) => note.id === id
  );

  if (noteIndex === -1) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    ...req.body,
    updatedAt: "Just now",
  };

  res.json(notes[noteIndex]);
});

// DELETE note
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  const noteExists = notes.some(
    (note) => note.id === id
  );

  if (!noteExists) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  notes = notes.filter((note) => note.id !== id);

  res.json({
    message: "Note deleted successfully",
  });
});

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "CollabWork Backend is running!",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});