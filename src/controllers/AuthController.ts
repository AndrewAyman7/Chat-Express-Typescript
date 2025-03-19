import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController{
    constructor(private readonly authService: AuthService) {}

    register = async (req: Request, res: Response) => {
        const { username, email, password } = req.body;
        try {
            const user = await this.authService.register(username, email, password);
            res.status(201).json(user);
        }catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }

    login = async (req: Request, res: Response) => {
        const {email, password} = req.body;
        try{
            const user = await this.authService.login(email, password);
            res.status(200).json(user);
        }catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }
}