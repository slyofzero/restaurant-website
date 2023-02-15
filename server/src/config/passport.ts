import { PassportStatic } from "passport";
import { IStrategyOptions, Strategy as LocalStrategy } from "passport-local";
import { loginUser } from "../controllers/User.js";
import User from "../models/User.js";

// --------------------------- Types ---------------------------
// Extending the Express.User interface to accodmodate the id parameter
declare global {
  namespace Express {
    interface User {
      id?: string;
    }
  }
}

// --------------------------- Function ---------------------------
export const initializePassport = (passport: PassportStatic) => {
  const formFields: IStrategyOptions = { usernameField: "email" };
  const strategy = new LocalStrategy(formFields, loginUser);

  passport.use(strategy);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    done(null, await User.findById(id));
  });
};
