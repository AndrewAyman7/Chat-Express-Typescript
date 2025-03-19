import { Request, Response } from 'express';

export interface IUserController {
  getUsers(req: Request, res: Response): Promise<void>;
  getUserById(req: Request, res: Response): Promise<void>;
}