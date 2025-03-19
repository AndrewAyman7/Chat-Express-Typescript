import { UserRepository } from '../repositories/UserRepository';
import { RoomRepository } from '../repositories/RoomRepository';
import { RoomMemberRepository } from '../repositories/RoomMemberRepository';
import { User } from '../entities/user.entity';
import { Room } from '../entities/room.entity';
import { RoomMember } from '../entities/roomMember.entity';

export class ValidationService {
    constructor(
        private userRepository: UserRepository,
        private roomRepository: RoomRepository,
        private roomMemberRepository: RoomMemberRepository
    ) {}

    validateUser = async(userId: number): Promise<User> =>{
        const user = await this.userRepository.getById(userId);
        if (!user) {
            throw new Error('user not found');
        }
        return user;
    }

    validateRoom = async(roomId: number): Promise<Room> =>{
        const room = await this.roomRepository.getById(roomId);
        if (!room) {
            throw new Error('Room not found');
        }
        return room;
    }

    validateMembership = async(senderId: number, roomId: number): Promise<void> =>{
        const isMember = await this.roomMemberRepository.isMemberOfRoom(senderId, roomId);
        if (!isMember) {
            throw new Error('Sender is not a member of the room');
        }
    }

    isUserJoined = async(senderId: number, roomId: number): Promise<void> =>{
        const isMember = await this.roomMemberRepository.isMemberOfRoom(senderId, roomId);
        if (isMember) {
            throw new Error('User Already Joined the group');
        }
    }
}