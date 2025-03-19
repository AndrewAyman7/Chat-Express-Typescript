import { RoomMember } from '../entities/roomMember.entity';
import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';
import { RoomMemberRepository } from '../repositories/RoomMemberRepository';

export class RoomMemberService {
    constructor(private roomMemberRepository: RoomMemberRepository) {}

    addMembersToRoom = async(room: Room, users: User[]): Promise<void> => {  
        for (const user of users) {
            const roomMember = new RoomMember();
            roomMember.user = user;
            roomMember.room = room;
            await this.roomMemberRepository.create(roomMember);
        }
    }

    validateMembership = async(senderId: number, roomId: number): Promise<void> =>{
        const isMember = await this.roomMemberRepository.isMemberOfRoom(senderId, roomId);
        if (!isMember) {
            throw new Error('Sender is not a member of the room');
        }
    }

    addMemberToRoom = async(room: Room, user: User): Promise<void> => {  
        const roomMember = new RoomMember();
        roomMember.user = user;
        roomMember.room = room;
        await this.roomMemberRepository.create(roomMember);
    }
}