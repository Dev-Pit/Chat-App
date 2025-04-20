import jwt from "jsonwebtoken";
import { ApiError } from "../util/ApiError.js";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, _, next) => {
  console.log(`\n 🔐 verifying JWT token...`);
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log(`\n🔑 you don't have token`);
      throw new ApiError(401, "Token empty, Unauthorized request!");
    }

    console.log(`\n🔑 Your token: ${token}`);

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(`\n🤐 Decoded token: ${JSON.stringify(decodedToken)}`);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -createdAt -updatedAt -__v"
    );

    if (!user) {
      console.log(`\n 🔐 user not found on DB according to token.`);
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(
      401,
      `Error while verifying token: ${error.message}` || "Invalid Access Token"
    );
  }
};
