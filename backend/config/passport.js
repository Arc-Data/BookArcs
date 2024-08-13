import { ExtractJwt, Strategy } from "passport-jwt"
import passport from "passport"
import User from "../model/User.js"
import dotenv from "dotenv"

dotenv.config()

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_TOKEN
}

passport.use(
    new Strategy(opts, async (payload, done) => {
        try {
            const user = User.findById(payload.id)
            if (user) return done(null, user)
        } catch (error) {
            return done(error)
        }
    })
)