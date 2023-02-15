import { Router } from "express";
import { createUser } from "../controllers/User.js";
export const authRouter = Router();
// --------------------------- POST ---------------------------
authRouter.post("/register", createUser);
