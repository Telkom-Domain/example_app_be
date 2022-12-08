import "reflect-metadata";
import express from "express";
import cors from "cors";

import { notesController } from "./controllers";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/notes", notesController);

export default app;
