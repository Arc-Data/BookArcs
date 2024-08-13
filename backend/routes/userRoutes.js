import { Router } from "express"
import UserController from "../controller/userController.js"
import passport from "passport"

const requireAuth = passport.authenticate('jwt', { session: false })

const router = Router()

router.use(requireAuth)

export default router