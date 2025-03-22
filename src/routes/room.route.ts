import { Router } from 'express';
import { RoomController } from '../controllers/RoomController';
import { validateUsersExist } from '../middlewares/checkUsersIds';
import { RoomService } from '../services/RoomService';
import { RoomRepository } from '../repositories/RoomRepository';
import { RoomMemberRepository } from '../repositories/RoomMemberRepository';
import { UserRepository } from '../repositories/UserRepository';
import { RoomMemberService } from '../services/RoomMemberService';
import { ValidationService } from '../services/SharedService';
import { authMiddleware } from '../middlewares/authMiddlewares';

// dependencies
const roomRepository = new RoomRepository();
const roomMemberRepository = new RoomMemberRepository();
const userRepository = new UserRepository();
const roomMemberService = new RoomMemberService(roomMemberRepository);
const validationService = new ValidationService(userRepository, roomRepository,roomMemberRepository);

const roomService = new RoomService(roomRepository, roomMemberService, validationService , roomMemberRepository );

const roomController = new RoomController(roomService);

const router = Router();

router.post('/', validateUsersExist, roomController.createRoom);
router.get('/', authMiddleware ,roomController.getRooms);
router.get('/user' , authMiddleware , roomController.getAuthorizedUserRooms);
router.get('/:id', roomController.getRoomById);
router.post('/join/:roomId', authMiddleware , roomController.joinRoom);
router.delete('/leave/:roomId', authMiddleware , roomController.leaveRoom);
router.delete('/:id', roomController.deleteRoom);


export default router;