import asyncHandler from "express-async-handler"
import User from '../model/User.js'
import RefreshToken from "../model/RefreshToken.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import crypto from "crypto"

dotenv.config()

const AuthController = (() => {

    const generateRefreshToken = async (userId) => {
        const token = crypto.randomBytes(64).toString('hex')
        
        await RefreshToken.create({ 
            token, 
            userId, 
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })
        
        return token
    }

    const generateAccessToken = (user) => {
        return jwt.sign(
            {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                }
            }, 
            process.env.JWT_SECRET_TOKEN,
            { expiresIn: '15m'}
        )
    }
    
    const createUser = asyncHandler(async (req, res) => {
        const { username, email, password } = req.body
        const errors = {}

        console.log("Huh?")

        if (!username) {
            errors['username'] = "Username is required"
        }

        if (!email) {
            errors['email'] = "Email is required"
        }

        if (!password) {
            errors['password'] = "Password is required"
        }

        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            errors['email'] = "Email already exists"
        }
        
        const existingUsername = await User.findOne({ username })
        if (existingUsername) {
            errors['username'] = "Username already taken"
        }
        
        if (Object.keys(errors).length > 0) {
            console.log("Do this")
            return res.status(400).json({
                message: "Validation Errors",
                errors: errors
            })
        }
        
        const user = await User.create({ username, email, password })
        
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    })
    
    const loginUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body
        
        // we are gonna return immediately even if this ends the response request cycle 
        // because we will have to assign tokens later and thats not possible without a successful User
        // fetch request
        if (!email || !password ) {
            return res.status(400).json({ message: "All fields are required"})
        }
        
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials"})
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials"})
        }

        const accessToken = generateAccessToken(user)
        const refreshToken = await generateRefreshToken(user._id)

        return res.status(200).json({
            accessToken,
            refreshToken,
        })

    }) 

    const refreshToken = asyncHandler(async (req, res) => {
        const { refreshToken: refresh } = req.body
    
        if (!refresh) {
            return res.status(400).json({ message: "Refresh token is required" })
        }

        
        const token = await RefreshToken.findOne({ token: refresh })
        if (!token) {
            return res.status(400).json({ message: "Invalid refresh token" })
        }

        if (token.isExpired) {
            return res.status(400).json({ message: "Refresh token already expired"})
        }

        const user = await User.findById(token.userId)
        if (!user) {
            return res.status(403).json({ message: "User not found"})
        }

        // remove the current refresh token
        await RefreshToken.deleteOne({ token: refresh })

        const accessToken = generateAccessToken(user)
        const refreshToken = await generateRefreshToken(user._id)

        return res.status(200).json({
            message: "Token refreshed",
            accessToken,
            refreshToken,
        })

    })

    const logoutUser = asyncHandler(async (req, res) => {
        const { refreshToken: refresh } = req.body

        if (!refresh) {
            return res.status(400).json({ message: "Refresh token is required" })
        }
        
        const result = await RefreshToken.deleteOne({ token: refresh })
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Refresh token not found" })
        }

        return res.status(200).json({ message: "Logged out successfully" });
    })

    return {
        createUser,
        loginUser,
        refreshToken,
        logoutUser,
    }
})()

export default AuthController