import mongoose, { Schema } from "mongoose";

const RefreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("RefreshToken", RefreshTokenSchema)