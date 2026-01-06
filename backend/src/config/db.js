// 
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config(); // allow the config to go through to access environment variables

export const connectDb = async () => {
    try
    {
        // connect to mongodb db with connection string and using mongoose ==> mongoose allows for db schema validation
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully!")
    }
    catch(error) 
    {
        console.error("Error connecting to MongoDB", error)
        process.exit(1) // 1 = Exit with failure, 0 = success
    }
}