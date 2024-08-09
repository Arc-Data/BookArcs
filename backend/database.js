import dotenv from "dotenv";
import mongoose from 'mongoose'

dotenv.config()

const user = process.env.DB_USER
const pass = process.env.DB_PASS
const uri = `mongodb+srv://${user}:${pass}@cluster0.u1nbs4l.mongodb.net/bookarcs?retryWrites=true&w=majority&appName=Cluster0`

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri)
        console.log(`Connected to MongoDB`)
    }
    catch (error) {
        console.log(`Error occured while connecting to the database: ${error}`)
    }
}
