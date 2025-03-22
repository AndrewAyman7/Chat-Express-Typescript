import { Router } from 'express';
import { MssgController } from '../controllers/MssgController';
import { MssgRepository } from '../repositories/MssgRepository';
import { UserRepository } from '../repositories/UserRepository';
import { RoomRepository } from '../repositories/RoomRepository';
import { RoomMemberRepository } from '../repositories/RoomMemberRepository';
import { ValidationService } from '../services/SharedService';
import { MssgService } from '../services/MssgService';
import { authMiddleware } from '../middlewares/authMiddlewares';

const mssgRepository = new MssgRepository();
const userRepository = new UserRepository();
const roomRepository = new RoomRepository();
const roomMemberRepository = new RoomMemberRepository();
const validationService = new ValidationService(userRepository, roomRepository, roomMemberRepository);

const mssgService = new MssgService(mssgRepository, validationService);

const mssgController = new MssgController(mssgService);


const router = Router();

router.post('/room/:roomId', authMiddleware , mssgController.createMssg);
router.get('/room/:roomId', mssgController.getMssgsByRoom);

router.get('/user', authMiddleware ,  mssgController.getAuthorizedUserMssgs);
router.get('/user/:userId', mssgController.getMssgsByUser);

export default router;