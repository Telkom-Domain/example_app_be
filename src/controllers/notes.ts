import { Router } from "express";
import { Note } from "../entity/Note";
import { verifyScope } from "../middlewares/tokenProcess";

export const notesController = Router();

notesController.get(
  "/protected",
  verifyScope("read:notes"),
  async (req, res) => {
    res.send("cool cool fosho");
  }
);

notesController.post("/", async (req, res) => {
  const { owner, title, body } = req.body;

  try {
    const new_note = new Note();
    new_note.owner = req.body.owner;
    new_note.title = req.body.title;
    new_note.body = req.body.body;
    await new_note.save();

    res.send(new_note);
  } catch (e) {
    console.error(e);
    res.send("CREATE ERROR");
  }
});

notesController.get("/", async (req, res) => {
  try {
    res.send(await Note.find());
  } catch (e) {
    console.error(e);
    res.send("CREATE ERROR");
  }
});

notesController.get("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  try {
    const found_note = await Note.findOne({ where: { id } });
    if (found_note) return res.send(found_note);
    res.sendStatus(404);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

notesController.put("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  try {
    const found_note = await Note.findOne({ where: { id } });
    if (found_note) {
      await Note.update(id, {
        owner: req.body.owner,
        title: req.body.title,
        body: req.body.body,
      });
      return res.send("Update Note Successfully");
    }
    res.sendStatus(404);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

notesController.delete("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  try {
    const found_note = await Note.findOne({ where: { id } });

    if (found_note) {
      await Note.delete(id);
      return res.send("Delete Note Successfully");
    }
    res.sendStatus(404);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});
