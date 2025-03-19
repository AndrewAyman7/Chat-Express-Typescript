import { Repository } from "typeorm";
import { Room } from "../entities/room.entity";
import { AppDataSource } from "../database/dbconfig";

export class RoomRepository{
    private repository:Repository<Room>

    constructor(){
        this.repository = AppDataSource.getRepository(Room);
    }

    getAll = async() :Promise<Room[]> => {
        //return await this.repository.find({relations: ['roomMembers']}); // Populate Room.RoomMembers
        return await this.repository.find({relations: ['roomMembers' , 'roomMembers.user']}); // Populate Populate Room.RoomMembers , Then RoomMembers.user
    }

    create = async (room:Partial<Room>) :Promise<Room> =>{
        const newRoom = this.repository.create(room);
        return await this.repository.save(newRoom);
    }

    getById = async (id:number) :Promise<Room | null> =>{
        return await this.repository.findOne({ where:{id} ,  relations: ['roomMembers', 'roomMembers.user'] });
    }

    getByUserId = async (userId:number) :Promise<Room[]> =>{
        return await this.repository.find({ where: { id: userId } });
    }

    deleteById = async(id: number): Promise<void> =>{
        await this.repository.delete(id);
    }

}