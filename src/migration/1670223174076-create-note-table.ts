import { MigrationInterface, QueryRunner } from "typeorm";

export class createNoteTable1670223174076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE notes (
                id SERIAL PRIMARY KEY,
                owner VARCHAR(255) NOT NULL,
                title VARCHAR NOT NULL,
                body TEXT NOT NULL,
                updated_at TIMESTAMPTZ NOT NULL,
                created_at TIMESTAMPTZ NOT NULL
            )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE notes`);
  }
}
