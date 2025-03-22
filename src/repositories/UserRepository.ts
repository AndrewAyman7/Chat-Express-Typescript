import { In, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../database/dbconfig';
import { IUserRepository } from '../interfaces/userInterfaces/IUserRepository';
import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository<User> implements IUserRepository{
    constructor() {
        super(User);
    }


    getByEmail = async(email:string):Promise<User | null> =>{
        return await this.repository.findOneBy({email:email});
    }

    getByIds = async (ids: number[]): Promise<User[]> => {
        return await this.repository.findBy({ id: In(ids) }); 
    }

    findUsersWithUnencryptedPasswords = async(): Promise<User[]> => {
        return this.repository.find({ where: { password: '123456' } });
    }

    updateUserPassword = async(user: User, encryptedPassword: string): Promise<void> => {
        user.password = encryptedPassword;
        await this.repository.save(user);
    }

}