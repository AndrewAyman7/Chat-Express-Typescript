import { DeepPartial, ObjectLiteral, Repository } from "typeorm";
import { IBaseRepository } from "../interfaces/repository/IBaseRepository";
import { AppDataSource } from "../database/dbconfig";

export class BaseRepository<T extends ObjectLiteral> implements IBaseRepository<T>{

    protected repository: Repository<T>;

    constructor(entity: new()=>T){ // new User() , new Room()
        this.repository = AppDataSource.getRepository(entity);
    }

    getAll = async() :Promise<T[]> =>{
        return await this.repository.find();
    }

    getById = async(id: number): Promise<T | null> =>{
        return await this.repository.findOneBy({ id } as any);
    }

    create = async(entity: Partial<T>): Promise<T> =>{
        const newEntity = this.repository.create(entity as DeepPartial<T>);
        return await this.repository.save(newEntity);
    }

    deleteById = async(id: number): Promise<void>=> {
        await this.repository.delete(id);
    }
}