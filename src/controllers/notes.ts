import { Request, Response, Router } from "express";
import { Note } from "../entity/Note";
import { useAuth, verifyScope } from "../middlewares/tokenProcess";

export const notesController = Router();

notesController.post("/", useAuth(), verifyScope("write:notes"), createNoteHandler);
notesController.get("/", useAuth(), verifyScope("read:notes"), getNoteHandler);
notesController.get("/:id", useAuth(), verifyScope("read:notes"), getNotesHandler);
notesController.put("/:id", useAuth(), verifyScope("update:notes"), updateNoteHandler);
notesController.delete("/:id", useAuth(), verifyScope("delete:notes"), deleteNoteHandler);

async function createNoteHandler(req: Request, res: Response) {
  if (!req.user?.id) {
    return res.status(403).send({ message: "Permission denied" });
  }

  try {
    const newNote = new Note();
    newNote.owner = req.user.id;
    newNote.title = req.body.title;
    newNote.body = req.body.body;
    await newNote.save();

    res.status(201).send(newNote);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Internal server error" });
  }
}

async function getNoteHandler(req: Request, res: Response) {
  const userId = req.user?.id;

  try {
    res.send(await Note.find({ where: { owner: userId } }));
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Internal server error" });
  }
}

async function getNotesHandler(req: Request, res: Response) {
  const noteId = Number.parseInt(req.params.id, 10);
  const userId = req.user?.id;

  try {
    const foundNote = await Note.findOne({ where: { id: noteId, owner: userId } });

    if (foundNote) return res.send(foundNote);

    res.sendStatus(404);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Internal server error" });
  }
}

async function updateNoteHandler(req: Request, res: Response) {
  const noteId = Number.parseInt(req.params.id, 10);
  const userId = req.user?.id;

  try {
    const foundNote = await Note.findOne({ where: { id: noteId, owner: userId } });

    if (foundNote) {
      foundNote.title = req.body.title;
      foundNote.body = req.body.body;
      await foundNote.save();

      return res.status(200).send({ message: "Update successful" });
    }

    res.sendStatus(404);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Internal server error" });
  }
}

async function deleteNoteHandler(req: Request, res: Response) {
  const noteId = Number.parseInt(req.params.id, 10);
  const userId = req.user?.id;

  try {
    const foundNote = await Note.findOne({ where: { id: noteId, owner: userId } });

    if (foundNote) {
      await foundNote.remove();

      return res.sendStatus(204);
    }

    res.sendStatus(404);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Internal server error" });
  }
}
