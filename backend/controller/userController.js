import asyncHandler from "express-async-handler";
import User from "../model/User.js";

const UserController = (() => {
    const getUser = asyncHandler(async (req, res) => {
        const { slug } = req.params

        const user = await User.findOne({ slug: slug })
        
        if (!user) {
            return res.status(404).json({
                message: "User does not exist."
            })
        }

        return res.status(200).json({
            message: "Success",
            user: user
        })
    })
    
    return {
        getUser,
    }
})()

export default UserController;