import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Not Authorized, missing token",
    });
  }

  // Extract token
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    // Attach user to request
    req.user = user;

    next(); // allow access
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
