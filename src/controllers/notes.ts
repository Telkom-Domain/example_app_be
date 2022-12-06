import { Router } from "express";
import { Note } from "../entity/Note";
const {tokenProcess} = require("../middleware");

export const notesController = Router();

// API BELOW NOT TESTED -> Can't test because no DB available

// CREATE NOTE
notesController.post("/", [tokenProcess.verifyScope("write:notes")], async (req, res) => {
  try {
    const new_note = new Note();
    new_note.owner = req.body.owner;
    new_note.title = req.body.title;
    new_note.body = req.body.body;        
    await new_note.save();

    res.send("CREATE SUCCESSFUL");
  } catch (e) {
    console.error(e);
    res.send("CREATE ERROR");
  }
});

// READ ALL NOTES
notesController.get("/", [tokenProcess.verifyScope("read:notes")], async (req, res) => {
  try {
    res.send(await Note.find());
  } catch (e) {
    console.error(e);
    res.send("CREATE ERROR");
  }
});

// GET BY ID
notesController.get("/:id", [tokenProcess.verifyScope("read:notes")], async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  
  try {
    const found_note = await Note.findOne({ where: { id } })    
    if(found_note) return res.send(found_note);
    res.sendStatus(404);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// Update Note
notesController.put("/:id", [tokenProcess.verifyScope("update:notes")], async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);     
  try {
    const found_note = await Note.findOne({ where: { id } })   
    if(found_note){
      await Note.update(id,{
        owner : req.body.owner,
        title : req.body.title,
        body : req.body.body,
      }); 
      return res.send("Update Note Successfully");
    }
    res.sendStatus(404);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// DELETE NOTE BY ID
notesController.delete("/:id", [tokenProcess.verifyScope("delete:notes")], async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  try {    
    const found_note = await Note.findOne({ where: { id } })      

    if(found_note){
      await Note.delete(id); 
      return res.send("Delete Note Successfully");
    }
    res.sendStatus(404);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);    
  }
});