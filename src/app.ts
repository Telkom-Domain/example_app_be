import 'reflect-metadata';
import express from 'express';

import { notesController } from './controllers';

const app = express();
app.use('/notes', notesController);

export default app;
