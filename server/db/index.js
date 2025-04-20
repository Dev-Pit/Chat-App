import mongoose from "mongoose";
import { DB_NAME } from "../util/constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_CONNECTION_STRING}/${DB_NAME}`
    );
    console.log(
      `\nserver: Mongo DB connected: DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`\nserver: Mongo DB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
