import { Router } from "express";
import AuthController from "../controller/authController.js";

const router = Router()

router.post('/register', AuthController.createUser)
router.post('/login', AuthController.loginUser)
router.post('/logout', AuthController.logoutUser)
// might need more research if you only need the refresh token or you need to 
// wrap this function in an access token check
router.post('/refresh', AuthController.refreshToken)

export default router