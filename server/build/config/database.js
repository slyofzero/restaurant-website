var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
mongoose.set("strictQuery", true);
import dotenv from "dotenv";
dotenv.config();
const { DB_URI } = process.env;
export const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (DB_URI) {
            const connection = yield mongoose.connect(DB_URI);
            console.log(`Mongo connected at ${connection.connection.host}`);
        }
        else {
            throw new Error("Database URI undefined");
        }
    }
    catch (err) {
        const error = err;
        console.log(error.message);
        process.exit(1);
    }
});
