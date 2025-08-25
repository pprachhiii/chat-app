import jwt from "jsonwebtoken";
import { User } from "../models/models.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      const message =
        err.name === "TokenExpiredError"
          ? "Unauthorized - Token expired"
          : "Unauthorized - Invalid token";
      return res.status(401).json({ success: false, message });
    }

    const user = await User.findById(decoded.userId).select("-password").lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
