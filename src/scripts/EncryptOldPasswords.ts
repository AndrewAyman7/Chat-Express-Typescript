import { AppDataSource } from '../database/dbconfig';
import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';

async function encryptPasswords() {
    await AppDataSource.initialize();
    
    const userRepository = new UserRepository();
    const users = await userRepository.findUsersWithUnencryptedPasswords();

    for (const user of users) {
        const encryptedPassword = await bcrypt.hash(user.password, 10);
        await userRepository.updateUserPassword(user, encryptedPassword);
        console.log(`Encrypted password for user ${user.id}`);
    }

    await AppDataSource.destroy();
}

encryptPasswords().catch(error => console.log(error));