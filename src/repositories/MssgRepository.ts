import { Repository } from 'typeorm';
import { AppDataSource } from "../database/dbconfig";
import { Mssg } from '../entities/mssg.entity';

export class MssgRepository {
    private repository: Repository<Mssg>;

    constructor() {
        this.repository = AppDataSource.getRepository(Mssg); // Dependency Injection
    }

    create = async(mssg: Partial<Mssg>): Promise<Mssg> =>{
        const newMssg = this.repository.create(mssg);
        return await this.repository.save(newMssg);
    }

    findByRoom = async(roomId: number): Promise<Mssg[]> => {
        return this.repository.find({ where: { room: { id: roomId } }, relations: ['sender', 'room'] });
    }

    findByUser = async (userId: number): Promise<Mssg[]> => {
        return this.repository.find({ where: { sender: { id: userId } }, relations: ['sender', 'room'] });
    }
}