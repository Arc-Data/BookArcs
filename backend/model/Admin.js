import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"

const AdminSchema = new Schema({
    'username': {
        type: String,
        required: true,
        unique: true,
    },
    'email': {
        type: String,
        required: true,
        unique: true,
    },
    'password': {
        type:String,
        select: false
    },
    roles: {
        type: [String],
        enum: ['super', 'verification', 'moderator'],
        default: ['independentAuthor'], // Default role
    }
})

AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    }
    catch (error) {
        console.log(`Error occured while saving user: ${error}`)
        next(error)
    }
})


// Admin Roles
// super - the SUPER admin. Can do everything
// verification - some sort of admin that only does verifications between legitimacy of publisher accounts
// moderator - in charge of platform message appropriateness

AdminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('Admin', AdminSchema);