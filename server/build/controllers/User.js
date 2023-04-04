var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User.js";
import bcrypt from "bcrypt";
// @desc Get the logged in user's info
// @route GET /user
// @access Private
export const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const { id } = req.user;
            const user = yield User.findById(id).select("-password");
            res.json({ message: user });
        }
        else {
            res.status(401).json({ message: "No user is logged in" });
        }
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: error.message });
    }
});
// @desc Create a new user
// @route POST /auth/register
// @access Public
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Check if email ID is available
        if (yield User.findOne({ email })) {
            return res.status(409).json({ message: "Email ID is already in use" });
        }
        // Hash the password
        const hashedPassword = yield bcrypt.hash(password, 10);
        // Creat new user
        const user = yield User.create({ name, email, password: hashedPassword });
        if (user) {
            return res.json({ message: `Hi ${name}, welcome onboard!` });
        }
        else {
            return res.status(400).json({ message: "Invalid user data received" });
        }
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: error.message });
    }
});
// @desc Log into an existing user account
// @route POST /auth/login
// @access Public
export const loginUser = (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if email ID is available
        console.log(email, password);
        const user = yield User.findOne({ email });
        if (!user) {
            return done(null, false, {
                message: `No user with email ${email} found.`,
            });
        }
        // Check the password
        if (!(yield bcrypt.compare(password, user.password))) {
            return done(null, false, { message: "Wrong user password" });
        }
        else {
            return done(null, user);
        }
    }
    catch (err) {
        const error = err;
        return done(error);
    }
});
