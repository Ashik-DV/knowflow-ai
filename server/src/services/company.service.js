import Company from "../models/Company.js";
import ApiError from "../utils/ApiError.js";

export const createCompany = async (companyData) => {

    const existingCompany = await Company.findOne({
        $or: [
            { companyEmail: companyData.companyEmail },
            { companyCode: companyData.companyCode }
        ]
    });

    if (existingCompany) {
        throw new ApiError(400, "Company already exists");
    }

    const company = await Company.create({
        companyName: companyData.companyName,
        companyCode: companyData.companyCode,
        companyEmail: companyData.companyEmail
    });

    return company;
};