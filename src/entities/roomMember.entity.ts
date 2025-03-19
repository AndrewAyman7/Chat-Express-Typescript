import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import { Room } from "./room.entity";
import { User } from "./user.entity";

@Entity('room_members')
export class RoomMember extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(()=>Room , room => room.roomMembers , { onDelete: "CASCADE" })
    room!:Room; //FK

    @ManyToOne(()=>User , user=>user.memberships , { onDelete: "CASCADE" })
    user!:User; //FK
}
