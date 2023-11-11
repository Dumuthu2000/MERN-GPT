import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ Message: "Ok", users });
        next();
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).json({ Message: "Error", Error: error.message });
    }
};
export const signUpUsers = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ Message: "Missing required fields" });
        }
        //Check email already created
        const createdEmail = await User.findOne({ email });
        if (createdEmail) {
            return res.status(400).json({ Message: "Email already registred" });
        }
        //Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        return res.status(200).json({ Message: "User created successfully", id: newUser._id.toString() });
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).json({ Message: "ERROR" });
    }
};
//Sign in user
export const signInUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(401).json({ Message: "Invalid credentials" });
        }
        //Check password is matched or not
        const isPasswordMatched = await bcrypt.compare(password, userData.password);
        if (!isPasswordMatched) {
            return res.status(403).json({ Message: "Invalid credentials" });
        }
        //When user logging previous cookie removing
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        });
        //Genereate token calling createToken function where in utils/token-manager
        const token = createToken(userData._id.toString(), userData.email, "7d");
        //Passing token from backedn to frontend(browser) using a cookie
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires: expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ Message: "User successfully logged", token: token });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ Message: "Invalid server error" });
    }
};
//# sourceMappingURL=user-controller.js.map