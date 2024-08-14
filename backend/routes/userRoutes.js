import { Router } from "express"
import UserController from "../controller/userController.js"
import requireAuth from "../config/requireAuth.js"

const router = Router()

router.use(requireAuth)

router.get('/:slug', UserController.getUser)

export default router