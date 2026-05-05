const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// // MongoDB connection
// mongoose.connect("mongodb://mongo:27017/devopsdb", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connect("mongodb://mongo:27017/devopsdb", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// mongoose.connect("mongodb://localhost:27017/devopsdb");

// mongoose.connect("mongodb://host.docker.internal:27017/devopsdb");


mongoose.connect("mongodb://mongo:27017/devopsdb");
// Schema
const NoteSchema = new mongoose.Schema({
  text: String,
});

const Note = mongoose.model("Note", NoteSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/add", async (req, res) => {
  const note = new Note({ text: req.body.text });
  await note.save();
  res.send("Note added");
});

app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});