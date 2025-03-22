import {BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Mssg } from './mssg.entity';
import { RoomMember } from './roomMember.entity';

@Entity('user')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({nullable:false})
    username!:string;

    @Column({nullable:false , unique: true })
    email!:string;

    @Column({nullable:false , default:'123456'})
    password!:string;

    @OneToMany(()=>Mssg , mssg=>mssg.sender)
    messages!: Mssg[];

    @OneToMany(()=> RoomMember , roomMember=>roomMember.user)
    memberships!:RoomMember[];
    
}