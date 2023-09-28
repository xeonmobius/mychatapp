import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(Bun.env.MONGO_URI!);
    console.log(`MongoDB Connected at: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;