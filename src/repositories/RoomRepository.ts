import { Repository } from "typeorm";
import { Room } from "../entities/room.entity";
import { AppDataSource } from "../database/dbconfig";
import { BaseRepository } from "./BaseRepository";

export class RoomRepository extends BaseRepository<Room>{

    constructor() {
        super(Room);
    }

    getByUserId = async (userId:number) :Promise<Room[]> =>{
        return await this.repository.find({ where: { id: userId } });
    }

}