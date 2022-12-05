import { AppDataSource } from "./data-source"

import dotenv from 'dotenv';
import app from "./app";

AppDataSource.initialize().then(async () => {
  dotenv.config();

  const port = (process.env.PORT ?? 1337) as unknown as number;
  const host = (process.env.HOST ?? '127.0.0.1') as string;

  app.listen(port, host, () => {
    console.log(`Example app listening at ${host}:${port}`);
  });
}).catch(error => console.log(error))
