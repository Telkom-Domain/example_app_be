import { Router } from "express";

export const notesController = Router();

notesController.get('/', (req, res) => {
  res.send('Hello world!');
});
