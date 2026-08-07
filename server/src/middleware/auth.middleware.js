import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Access token is required");
  }

  const token = authHeader.split(" ")[1];

  console.log("Received Token:", token);
  console.log("JWT Secret:", process.env.JWT_SECRET);

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
  } catch (error) {
    console.log("JWT Verify Error:", error.message);
    throw new ApiError(401, "Invalid token");
  }

  const user = await User.findById(decoded._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;

  next();
});