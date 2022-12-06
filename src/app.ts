import "reflect-metadata";
import express from "express";

import { notesController } from "./controllers";

const app = express();

app.use(express.json());
app.use("/notes", notesController);

export default app;
