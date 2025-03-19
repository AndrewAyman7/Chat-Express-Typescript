import { User } from "../entities/user.entity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/UserRepository";

export class AuthService{
    constructor(private userRepository:UserRepository){}

    register = async(username:string , email:string , password:string) :Promise<User>=>{
        const emailExist = await this.userRepository.getByEmail(email);
        if(emailExist){
            throw new Error('Email Is Already Exist, choose another one');
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = hashedPassword;

        return this.userRepository.create(user);

    }

    login = async(email:string, password:string) :Promise<string> => {
        const user = await this.userRepository.getByEmail(email);
        if(!user){
            throw new Error('This Email is not exist');
        }

        const isPasswordCorrect = await bcrypt.compare(password , user.password);
        if (!isPasswordCorrect) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({userId:user.id} , process.env.JWT_SECRET! , {expiresIn:'1d'});
        //const token = jwt.sign({user:user} , process.env.JWT_SECRET! , {expiresIn:'1d'});
        
        return token;

    }
}