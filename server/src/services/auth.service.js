import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { createCompany } from "./company.service.js";

/**
 * Register Company + Admin
 */
export const registerAdmin = async (data) => {
  // Check if admin email already exists
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new ApiError(400, "Admin email already exists");
  }

  // Create Company
  const company = await createCompany({
    companyName: data.companyName,
    companyCode: data.companyCode,
    companyEmail: data.companyEmail,
  });

  // Create Admin User
  const admin = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    role: "ADMIN",
    companyId: company._id,
  });

  // Generate Tokens
  const accessToken = admin.generateAccessToken();
  const refreshToken = admin.generateRefreshToken();

  // Save Refresh Token
  admin.refreshToken = refreshToken;
  await admin.save({ validateBeforeSave: false });

  // Remove Sensitive Data
  const adminResponse = admin.toObject();
  delete adminResponse.password;
  delete adminResponse.refreshToken;

  return {
    company,
    admin: adminResponse,
    accessToken,
    refreshToken,
  };
};

/**
 * Login User
 */
export const login = async (data) => {
  const { email, password } = data;

  // Find User
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Compare Password
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate Tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Save Refresh Token
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Remove Sensitive Data
  const userResponse = user.toObject();
  delete userResponse.password;
  delete userResponse.refreshToken;

  return {
    user: userResponse,
    accessToken,
    refreshToken,
  };
};