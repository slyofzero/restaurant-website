import { Router } from "express";
import { getUser } from "../controllers/User.js";
export const userRouter = Router();
// --------------------------- GET ---------------------------
userRouter.get("/", getUser);
userRouter.post("/logout", (req, res) => {
    req.logOut((err) => {
        if (err)
            res.status(400).json({ message: err.message });
    });
});
