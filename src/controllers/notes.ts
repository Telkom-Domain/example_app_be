import { Router } from "express";
import { Note } from "../entity/Note";

export const notesController = Router();

notesController.get("/", (req, res) => {
  res.send("Hello world!");
});

// API BELOW NOT TESTED -> Can't test because no DB available

// CREATE NOTE
notesController.post("/", (req, res) => {
  try {
    const new_note = new Note();
    new_note["owner"] = req.body.owner;
    new_note["title"] = req.body.title;
    new_note["body"] = req.body.body;
    new_note["created_at"] = Date();
    new_note["updated_at"] = Date();
    new_note.save;
    res.send("CREATE SUCCESSFUL");
  } catch (e) {
    console.error(e);
    res.send("CREATE ERROR");
  }
});

// READ ALL NOTES
notesController.get("/", (req, res) => {
  try {
    res.send(Note.find());
  } catch (e) {
    console.error(e);
    res.send("CREATE ERROR");
  }
});