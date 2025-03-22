import { Mssg } from "../entities/mssg.entity";
import { Room } from "../entities/room.entity";
import { User } from "../entities/user.entity";
import { MssgRepository } from "../repositories/MssgRepository";

import { ValidationService } from "./SharedService";

export class MssgService {
    constructor(
        private mssgRepository: MssgRepository,
        private validationService: ValidationService
    ){}

    createMssg = async(content:string , senderId:number , roomId:number) : Promise<Mssg>=>{
        const sender = await this.validationService.validateUser(senderId);
        const room = await this.validationService.validateRoom(roomId);
        await this.validationService.validateMembership(senderId, roomId);


        return this.createMessageLogic(content, sender, room);
    }

    private async createMessageLogic(content: string, sender: User, room: Room): Promise<Mssg> {
        const newMssg = new Mssg();
        newMssg.content = content;
        newMssg.sender = sender;
        newMssg.room = room;

        return this.mssgRepository.create(newMssg);
    }

    getMssgsByRoom = async(roomId: number): Promise<Mssg[]> =>{
        return this.mssgRepository.findByRoom(roomId);
    }

    getMssgsByUser = async(userId: number): Promise<Mssg[]> =>{
        return this.mssgRepository.findByUser(userId);
    }
    
}