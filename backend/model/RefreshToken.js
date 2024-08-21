import mongoose, { Schema } from "mongoose";

const RefreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    userType: {
        type: String,
        enum: ['User', 'Admin'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
    }
})

RefreshTokenSchema.virtual('isExpired').get(function() {
    return this.expiresAt < Date.now()
})

RefreshTokenSchema.virtual('user', {
    ref: doc => doc.userType,
    localField: 'userId',
    foreignField: '_id',
    justOne: true
})

RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("RefreshToken", RefreshTokenSchema)