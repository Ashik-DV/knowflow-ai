import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createCompany } from "../services/company.service.js";

export const registerCompany = asyncHandler(async (req, res) => {

    const company = await createCompany(req.body);

    return res.status(201).json(

        new ApiResponse(
            201,
            "Company registered successfully",
            company
        )

    );

});