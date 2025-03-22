import { User } from "../entities/user.entity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/UserRepository";
import { RegisterDto } from "../dtos/RegisterDTO";
import { LoginDto } from "../dtos/LoginDTO";

export class AuthService{
    constructor(private userRepository:UserRepository){}

    register = async(registerDto:RegisterDto) :Promise<User>=>{
        const emailExist = await this.userRepository.getByEmail(registerDto.email);
        if(emailExist){
            throw new Error('Email Is Already Exist, choose another one');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password,10);
        const user = new User();
        user.username = registerDto.username;
        user.email = registerDto.email;
        user.password = hashedPassword;

        return this.userRepository.create(user);

    }

    login = async(loginDto:LoginDto) :Promise<string> => {
        const user = await this.userRepository.getByEmail(loginDto.email);
        if(!user){
            throw new Error('This Email is not exist');
        }

        const isPasswordCorrect = await bcrypt.compare(loginDto.password , user.password);
        if (!isPasswordCorrect) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({userId:user.id} , process.env.JWT_SECRET! , {expiresIn:'1d'});
        
        return token;

    }
}