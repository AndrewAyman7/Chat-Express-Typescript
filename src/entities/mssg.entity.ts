import { BaseEntity, Collection, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Room } from "./room.entity";

@Entity('mssgs')
export class Mssg extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column("text")
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(()=>User , user=>user.messages , { onDelete: "CASCADE" }) // When delete user , delete his mssgs  (will Delete them by default, without handling it in service)
    sender!: User; //FK

    @ManyToOne(()=>Room , room=>room.messages , { onDelete: "CASCADE" }) // When delete room , delete its mssgs
    room!:Room; //FK
}
