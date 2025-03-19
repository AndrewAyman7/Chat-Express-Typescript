import { Request, Response } from 'express';
import { MssgService } from '../services/MssgService';

export class MssgController {

    constructor(private readonly mssgService: MssgService) {}

    createMssg = async (req: any, res: Response) => {
        const { content  } = req.body;
        const roomId = parseInt(req.params.roomId);
        const senderId = req.user.userId;

        if (!content || !senderId || !roomId) {
            res.status(400).json({ message: 'Content, senderId, and roomId are required' });
            return;
        }

        try {
            const mssg = await this.mssgService.createMssg(content, senderId, roomId);
            res.status(201).json(mssg);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }

    getMssgsByRoom = async(req: Request, res: Response) =>{
        const roomId = parseInt(req.params.roomId);

        if (isNaN(roomId)) {
             res.status(400).json({ message: 'Invalid roomId' });
             return;
        }

        try {
            const mssgs = await this.mssgService.getMssgsByRoom(roomId);
            res.json(mssgs);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    getMssgsByUser = async(req: Request, res: Response) =>{
        const userId = parseInt(req.params.userId);

        if (isNaN(userId)) {
            res.status(400).json({ message: 'Invalid userId' });
        }

        try {
            const mssgs = await this.mssgService.getMssgsByUser(userId);
            res.json(mssgs);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    getAuthorizedUserMssgs = async(req: any, res: Response) =>{
        try {
            const userId = req.user.userId;
            const mssgs = await this.mssgService.getMssgsByUser(userId);
            res.json(mssgs);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }

}