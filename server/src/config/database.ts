import mongoose from "mongoose";
mongoose.set("strictQuery", true);
import dotenv from "dotenv";
dotenv.config();

const { DB_URI } = process.env;

export const connectDB = async () => {
  try {
    if (DB_URI) {
      const connection = await mongoose.connect(DB_URI);
      console.log(`Mongo connected at ${connection.connection.host}`);
    } else {
      throw new Error("Database URI undefined");
    }
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    process.exit(1);
  }
};
