import {Router, Request, Response} from "express";

import { validateUserLogin, validateUserRegister } from "../validations/userValidation";
import { handleValidationErrors } from "../middlewares/handleValidationsErrors";

import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../services/AuthService";
import { UserRepository } from "../repositories/UserRepository";

const router = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

const authController = new AuthController(authService);

router.post('/register', validateUserRegister() , handleValidationErrors , authController.register);
router.post('/login', validateUserLogin() , handleValidationErrors , authController.login);


export default router;