import { Room } from '../entities/room.entity';
import { RoomMember } from '../entities/roomMember.entity';
import { User } from '../entities/user.entity';
import { RoomType } from '../enums/RoomType';
import { RoomMemberRepository } from '../repositories/RoomMemberRepository';
import { RoomRepository } from '../repositories/RoomRepository';
import { RoomMemberService } from './RoomMemberService';
import { ValidationService } from './SharedService';

export class RoomService {
    constructor(
        private roomRepository: RoomRepository,
        private roomMemberService: RoomMemberService,
        private validationService: ValidationService,
        private roomMemberRepository: RoomMemberRepository
    ) {}

    getAllRooms = async (): Promise<Room[]> => {
        return await this.roomRepository.getAll();
    }

    createRoom = async(name:string , type:RoomType , users: User[]): Promise<Room> => {
        // 1- Create Room
        const room = new Room();
        room.name = name;
        room.type = type;
        const newRoom = await this.roomRepository.create(room);

        // 2- Add Members to the room  (RoomMember Join relation) = RoomId + UserId
        this.roomMemberService.addMembersToRoom(newRoom,users);

        return newRoom;
    }

    getRoomById = async (id: number): Promise<Room | null> => {
        return await this.roomRepository.getById(id);
    }

    deleteRoomById = async(id: number): Promise<void> => {
        const room = await this.roomRepository.getById(id);
        if (!room) {
            throw new Error('room not found');
        }
        await this.roomRepository.deleteById(id);
    }

    joinRoom = async(userId:number, roomId:number) =>{
        const user = await this.validationService.validateUser(userId);
        const room = await this.validationService.validateRoom(roomId);
        if (room.type !== RoomType.GROUP) {
            throw new Error('Cannot join a room that is not a group');
        }
        await this.validationService.isUserJoined(userId, roomId); // if user Already Joined
        
        this.roomMemberService.addMemberToRoom(room,user);

    }

    leaveRoom = async(userId: number, roomId: number): Promise<void> =>{
        const isMember = await this.validationService.validateMembership(userId, roomId);
        await this.roomMemberRepository.deleteMembership(userId,roomId);
    }

    public async getUserRooms(userId: number): Promise<Room[]> {
        return this.roomMemberRepository.findRoomsByUserId(userId);
    }
}