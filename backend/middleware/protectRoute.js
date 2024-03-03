import jwt from "jsonwebtoken";
import User from "../models/users.model.js";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "No Token Found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in Protect Route Middleware", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
