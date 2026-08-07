import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  registerAdmin,
  login,
} from "../services/auth.service.js";

/**
 * Register Company + Admin
 */
export const registerCompanyAdmin = asyncHandler(async (req, res) => {
  const result = await registerAdmin(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      "Company registered successfully",
      result
    )
  );
});

/**
 * Login User
 */
export const loginUser = asyncHandler(async (req, res) => {
  const result = await login(req.body);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Login successful",
      result
    )
  );
});