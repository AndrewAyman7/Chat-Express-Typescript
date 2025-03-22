import { RoomService } from "../services/RoomService";
import {Request, Response} from "express";


export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    createRoom = async (req:any, res:Response)=>{
        const {name, type, membersIds} = req.body;
        if (!type || !Array.isArray(membersIds) || membersIds.length === 0) {
            res.status(400).json({ message: 'Type and memberIds are required' });
            return;
        }

        try {
            const users = req.users; // I Get Them in the Middleware
            const room = await this.roomService.createRoom(name, type, users);
            res.status(201).json(room);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    getRooms = async (req: any, res: Response) => {
        try {
            console.log(req.user.userId);
            const rooms = await this.roomService.getAllRooms();
            res.json(rooms);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    getRoomById = async (req: Request, res: Response) =>{
        try {
            const room = await this.roomService.getRoomById(parseInt(req.params.id, 10));
            if (room) {
                res.json(room);
            } else {
                res.status(404).json({ message: 'Room not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    getAuthorizedUserRooms = async (req:any, res: Response) =>{
        try {
            const userId = req.user.userId
            const room = await this.roomService.getUserRooms(userId);
            if (room) {
                res.json(room);
            } else {
                res.status(404).json({ message: 'Room not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    deleteRoom = async (req: Request, res: Response) => {
        const roomId = parseInt(req.params.id);

        if (isNaN(roomId)) {
            res.status(400).json({ message: 'Invalid room ID' });
            return;
        }

        try {
            await this.roomService.deleteRoomById(roomId);
            res.status(204).send({ message: 'Deleted Successfully' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }

    joinRoom = async (req: any, res: Response) => {
        const userId = req.user.userId;
        const roomId = parseInt(req.params.roomId);

        // if (isNaN(userId) || isNaN(roomId)) {
        //     res.status(400).json({ message: 'Invalid user ID or room ID' });
        //     return;
        // }

        try {
            await this.roomService.joinRoom(userId, roomId);
            res.status(200).json({ message: 'User joined the room' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            } 
        }
    }

    leaveRoom = async (req: any, res: Response) => {
        try {
            const roomId = parseInt(req.params.roomId);
            const userId = req.user.userId;

            await this.roomService.leaveRoom(userId, roomId);
            res.status(200).json({ message: 'User left the room' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            } 
        }
    }

}