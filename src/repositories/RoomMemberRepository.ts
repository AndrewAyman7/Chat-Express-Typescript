import { Repository } from 'typeorm';
import { RoomMember } from '../entities/roomMember.entity';
import { AppDataSource } from "../database/dbconfig";
import { Room } from '../entities/room.entity';

export class RoomMemberRepository {
    private repository: Repository<RoomMember>;

    constructor() {
        this.repository = AppDataSource.getRepository(RoomMember);
    }

    getAll = async (): Promise<RoomMember[]> => {
        return await this.repository.find();
    };

    create = async (roomMember: Partial<RoomMember>): Promise<RoomMember> => {
        const newRoomMember = this.repository.create(roomMember);
        return await this.repository.save(newRoomMember);
    };

    getById = async (id: number): Promise<RoomMember | null> => {
        return await this.repository.findOneBy({ id });
    };

    findByRoomId = async (roomId: number): Promise<RoomMember[]> => {
        return await this.repository.find({ where: { room: { id: roomId } } });
    };

    isMemberOfRoom = async(userId: number, roomId: number): Promise<boolean> =>{
        const count = await this.repository.count({ where: { user: { id: userId }, room: { id: roomId } } });
        return count > 0;
    }

    deleteMembership = async(userId: number, roomId: number): Promise<void>=>{
        await this.repository.delete({user:{id:userId} , room: { id: roomId }})
    }

    findRoomsByUserId = async(userId: number): Promise<Room[]> =>{
        const roomMembers = await this.repository.find({  // Return RoomMembers and its Rooms (Populate)
            where: { user: { id: userId } },
            relations: ['room'],
        });

        return roomMembers.map(roomMember => roomMember.room);  // Take Just Rooms
    }
}

