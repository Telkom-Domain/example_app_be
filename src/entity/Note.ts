import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true
  })
  owner: string

  @Column("string")
  title: string

  @Column("string")
  body: String
}
