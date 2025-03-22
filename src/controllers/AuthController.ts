import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { handleError } from '../utils/errorHandler';
import { RegisterDto } from '../dtos/RegisterDTO';
import { LoginDto } from '../dtos/LoginDTO';

export class AuthController{
    constructor(private readonly authService: AuthService) {}

    register = async (req: Request, res: Response) => {
        const registerDto = new RegisterDto();
        Object.assign(registerDto, req.body);
        try {
            const user = await this.authService.register(registerDto);
            res.status(201).json(user);
        }catch (error) {
            handleError(res,error);
        }
    }

    login = async (req: Request, res: Response) => {
        const loginDto = new LoginDto();
        Object.assign(loginDto , req.body);
        try{
            const user = await this.authService.login(loginDto);
            res.status(200).json(user);
        }catch (error) {
            handleError(res,error);
        }
    }
}