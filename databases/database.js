import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// getting the connection string
const Mongo_URI = process.env.MONGODBCONNECTIONSTRING;

// connecting to the database

const connectDB = async () => {
    try {
        await mongoose.connect(Mongo_URI, {
          
        });
        console.log("MongoDB is connected");
    } catch (error) {
        console.log("Error while connecting to MongoDB: ", error.message);
        
    }
}
  

export const dbconnection = connectDB;