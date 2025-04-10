import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../index.js";

// create new user
export const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ res: 400, message: "All fields are required!" });
    }
    // Check if the user already exists
    const fetchUser = await User.findOne({ email });
    if (fetchUser) {
      return res
        .status(400)
        .json({ res: 400, message: "User already exists!" });
    }

    // save the user
    await User.create({ username, email, password });

    res.status(201).json({ message: "User created!" });
    //   if error occurs then pass to next()
  } catch (error) {
    next(error);
  }
};

// user login
export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ res: 400, message: "All fields are required!" });
    }

    // Check if the user exists
    const fetchUser = await User.findOne({ email });
    if (fetchUser) {
      const hashedPassword = fetchUser.password;
      // compare password in DB
      const match = await bcrypt.compare(password, hashedPassword);
      // if password matched
      if (match) {
        const { username, email, role } = fetchUser;
        const token = jwt.sign({ username, email, role }, SECRET_KEY, {
          expiresIn: "7d",
        });
        // send response to the user
        return res.status(200).json({ token });
      }
      // password didn't matched
      else {
        return res.status(400).json({ res: 400, message: "Wrong Password!" });
      }
    }
  } catch (error) {
    next(error);
  }
};
