import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'

const UserSchema = new Schema({
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
        type: String,
        required: true,
    },
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } 
    catch (error) {
        console.log(`Error occured while saving user`)
        next(err)
    }
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('User', UserSchema)