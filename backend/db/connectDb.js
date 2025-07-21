import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoDbUrl = process.env.MONGO_URI;

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(mongoDbUrl);
    console.log(`Mongodb connect successfully : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Mongodb connection failed : ${error}`);
  }
};
