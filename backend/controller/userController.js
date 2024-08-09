import asyncHandler from "express-async-handler"
import User from '../model/User.js'

export const user_create = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body
    
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
        return res.status(400).json({
            message: "Email already exists"
        })
    }

    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
        return res.status(400).json({
            message: "Username already taken"
        })
    }

    const user = await User.create({ username, email, password })

    res.status(201).json({
        "message": "User created successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
})