import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../index.js";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //   console.log("Auth header:", req.headers.authorization);
  //   console.log("Headers:", req.headers);

  // Check if Authorization header exists and starts with "Bearer "
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1]; // Get the actual token

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded; // Attach decoded user info to request
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

export default verifyToken;
