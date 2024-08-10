import { Router } from "express";
import AuthController from "../controller/authController.js";

const router = Router()

router.post('/register', AuthController.createUser)
router.post('/login', AuthController.loginUser)
router.post('/refresh', AuthController.refreshToken)

export default router