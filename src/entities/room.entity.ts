import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, BaseEntity } from "typeorm";
import { RoomType } from "../enums/RoomType";
import { Mssg } from "./mssg.entity";
import { RoomMember } from "./roomMember.entity";

@Entity('rooms')
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable:true})
    name!: string; // If Group

    @Column({ type: "enum", enum: RoomType})  // Enum: Private - Group
    type!: RoomType;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(()=>Mssg , mssg => mssg.room)
    messages!:Mssg[];

    @OneToMany(()=>RoomMember , roomMember => roomMember.room)
    roomMembers!: RoomMember[];
}
