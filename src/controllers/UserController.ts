import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { IUserController } from '../interfaces/userInterfaces/IUserController';

export class UserController implements IUserController{
    private userService = new UserService();

    getUsers = async (req: Request, res: Response) =>{ 
        try{
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    getUserById = async (req: Request, res: Response) =>{
        try{
            const user = await this.userService.getUserById(parseInt(req.params.id));
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }catch(err){
            res.status(500).json({ message: 'Internal server error' }); // lw ba3at fe el header id : string .. parseInt() will throw an error ..
        }
        
    }

    deleteUser = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id);

        if (isNaN(userId)) {
            res.status(400).json({ message: 'Invalid user ID' });
            return;
        }

        try {
            await this.userService.deleteUserById(userId);
            res.status(204).send({ message: 'Deleted Successfully' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }
}