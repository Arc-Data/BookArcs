import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import slugify from "slugify";

const UserSchema = new Schema({
    // apparently "unique"ness in mongoDB respects case sensitive rules
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
        select: false
    },
    'slug': {
        type: String,
        unique: true,
    }
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

UserSchema.pre('save', async function (next) {
    if (!this.isModified('username')) {
        this.slug = slugify(this.username, { lower: true})
    }

    next()
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('User', UserSchema)