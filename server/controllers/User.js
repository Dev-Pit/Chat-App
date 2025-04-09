import User from "../models/User.js";

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
    const result = await User.create({ username, email, password });
    res.status(201).json({ message: "User created!" });
    //   if error occurs then pass to next()
  } catch (error) {
    next(error);
  }
};
