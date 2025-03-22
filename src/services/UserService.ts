import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/user.entity';
import { IUserService } from '../interfaces/userInterfaces/IUserService';

export class UserService implements IUserService {
    private userRepository = new UserRepository();

    getAllUsers = async (): Promise<User[]> => {
        return await this.userRepository.getAll();
    }

    getUserById = async (id: number): Promise<User | null> => {
        return await this.userRepository.getById(id);
    }

    deleteUserById = async(id: number): Promise<void> => {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error('User not found');
        }
        await this.userRepository.deleteById(id);
    }

    
}