import { User } from "../models/user.model.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../util/constant.js";

// * add options along with cookie
const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user)
      throw new ApiError(401, "user not found in DB to generate token");

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    const userA = await User.findByIdAndUpdate(
      userId,
      {
        $set: { refreshToken: refreshToken },
      },
      { new: true }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "error while generating access and refresh token!");
  }
};

// register user
const saveUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if ([username, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required!");
    }

    // check if user exist or not
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
      throw new ApiError(409, `User with username or email exists!`);
    }

    const user = await User.create({ username, email, password });
    if (!user) throw new ApiError(400, "Failed to save user");

    res
      .status(201)
      .json(
        new ApiResponse(201, { username: user.username, email: user.email })
      );
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!(username || email))
      throw new ApiError(400, "all fields are required!");

    if (password === ("" || null || undefined) || password.lenght < 6)
      throw new ApiError(400, "pasword length must be more than 6!");

    const findUser = await User.findOne({ $or: [{ username }, { email }] });
    if (!findUser) throw new ApiError(401, "user not found!");

    const isPasswordCorrect = await findUser.isPasswordCorrect(password);

    if (!isPasswordCorrect) throw new ApiError(401, "password incorrect!");

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      findUser._id
    );

    const response = {
      email: findUser.email,
      username: findUser.username,
      role: findUser.role,
      accessToken,
    };
    console.log("🚀 ~ loginUser ~ response:", response);

    res
      .status(200)
      .cookie(ACCESS_TOKEN, accessToken, options)
      .cookie(REFRESH_TOKEN, refreshToken, options)
      .json(new ApiResponse(200, response, "logged in successfully"));
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  console.log(`\nlogout controller hit ${req.data}`);
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );
  res
    .status(200)
    .clearCookie(ACCESS_TOKEN, options)
    .clearCookie(REFRESH_TOKEN, options)
    .json(
      new ApiResponse(
        200,
        { username: user.username, email: user.email },
        "logged out successfully!"
      )
    );
};
export { saveUser, loginUser, logout };
