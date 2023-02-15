import { Router } from "express";
import passport from "passport";
import { createUser } from "../controllers/User.js";

export const authRouter = Router();

// --------------------------- POST ---------------------------
authRouter.post("/register", createUser);
authRouter.post("/login", (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }

    if (info) {
      return res.status(400).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        const error = err as Error;
        return res.status(500).json({ message: error.message });
      } else {
        return res.json({ message: `User ${user.name} logged in` });
      }
    });
  })(req, res);
});
