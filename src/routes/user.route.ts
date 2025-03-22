import {Router, Request, Response} from "express";

import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById.bind(userController));
router.delete('/:id', userController.deleteUser);

export default router;