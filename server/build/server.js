import express from "express";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/database.js";
import { authRouter } from "./routes/auth.js";
import { initializePassport } from "./config/passport.js";
import { userRouter } from "./routes/user.js";
// --------------------------- Variables ---------------------------
const { NODE_ENV, DB_URI, SESSION_SECRET } = process.env;
const PORT = process.env.PORT || 3507;
const server = express();
initializePassport(passport);
// --------------------------- Database ---------------------------
connectDB();
// --------------------------- Database ---------------------------
// || CORS
const corsOptions = { origin: true, credentials: true };
server.use(cors(corsOptions));
// || Session
if (SESSION_SECRET) {
    const sessionStore = MongoStore.create({ mongoUrl: DB_URI });
    server.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 31 },
    }));
    server.use(cookieParser(SESSION_SECRET));
}
else {
    console.log("Session secret is undefined");
    process.exit(1);
}
// || Body parser middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
// || Passport
server.use(passport.initialize());
server.use(passport.session());
// || Logger
server.use(morgan("dev"));
// --------------------------- Routes ---------------------------
server.use("/auth", authRouter);
server.use("/user", userRouter);
// --------------------------- Server Running ---------------------------
server.listen(PORT, () => console.log(`Server running in ${NODE_ENV} mode on port ${PORT}\nhttp://localhost:${PORT}`));
// --------------------------- E.o.C ---------------------------
