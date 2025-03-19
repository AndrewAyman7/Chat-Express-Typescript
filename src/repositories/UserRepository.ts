import { In, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../database/dbconfig';
import { IUserRepository } from '../interfaces/userInterfaces/IUserRepository';

export class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    getAll = async() :Promise<User[]> =>{
        return await this.repository.find();
    }
    // getAll(): Promise<User[]> {
    //     return this.repository.find();
    // }

    create = async(user: Partial<User>) :Promise<User> =>{
        const newUser = this.repository.create(user);
        return await this.repository.save(newUser);
    }

    getById = async(id:number): Promise<User | null> => {
        return await this.repository.findOneBy({ id });
    }

    getByEmail = async(email:string):Promise<User | null> =>{
        return await this.repository.findOneBy({email:email});
    }

    getByIds = async (ids: number[]): Promise<User[]> => {
        return await this.repository.findBy({ id: In(ids) }); 
    }

    deleteById = async(id: number): Promise<void> =>{
        await this.repository.delete(id);
    }

    findUsersWithUnencryptedPasswords = async(): Promise<User[]> => {
        return this.repository.find({ where: { password: '123456' } });
    }

    updateUserPassword = async(user: User, encryptedPassword: string): Promise<void> => {
        user.password = encryptedPassword;
        await this.repository.save(user);
    }

}