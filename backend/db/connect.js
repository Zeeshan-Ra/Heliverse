import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URL);
    await mongoose.connect(
      process.env.MONGO_URL
    );
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection FAIL");
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
