import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { VerifyFunction } from "passport-local";

type ControllerFuncType = (req: Request, res: Response) => any;

// @desc Get the logged in user's info
// @route GET /user
// @access Private
export const getUser: ControllerFuncType = async (req, res) => {
  try {
    if (req.user) {
      const { id } = req.user;
      const user = await User.findById(id).select("-password");

      res.json({ message: user });
    } else {
      res.status(401).json({ message: "No user is logged in" });
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new user
// @route POST /auth/register
// @access Public
export const createUser: ControllerFuncType = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email ID is available
    if (await User.findOne({ email })) {
      return res.status(409).json({ message: "Email ID is already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creat new user
    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
      return res.json({ message: `Hi ${name}, welcome onboard!` });
    } else {
      return res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};

// @desc Log into an existing user account
// @route POST /auth/login
// @access Public
export const loginUser: VerifyFunction = async (email, password, done) => {
  try {
    // Check if email ID is available
    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, {
        message: `No user with email ${email} found.`,
      });
    }

    // Check the password
    if (!(await bcrypt.compare(password, user.password))) {
      return done(null, false, { message: "Wrong user password" });
    } else {
      return done(null, user);
    }
  } catch (err) {
    const error = err as Error;
    return done(error);
  }
};
