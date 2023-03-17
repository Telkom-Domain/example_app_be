import "reflect-metadata";
import { DataSource } from "typeorm";
import { Note } from "./entity/Note";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "host.docker.internal",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "alpinemd_ts",
  synchronize: true,
  logging: false,
  entities: [Note],
  migrations: [],
  subscribers: [],
});
