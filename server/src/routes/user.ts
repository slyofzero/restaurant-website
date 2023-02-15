import { Router } from "express";
import { getUser } from "../controllers/User.js";

export const userRouter = Router();

// --------------------------- GET ---------------------------
userRouter.get("/", getUser);

// --------------------------- DELETE ---------------------------
userRouter.delete("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) res.status(400).json({ message: err.message });
    else res.json({ message: "User logged out" });
  });
});
