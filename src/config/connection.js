import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

export const connectDB = async ()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database is connected successfully")
    } catch (error) {
        console.log("Failed to connect the database");
    }
}