import { Router } from "express";
import { user_create } from '../controller/userController.js'

const router = Router()

router.post("/create", user_create)

export default router;
