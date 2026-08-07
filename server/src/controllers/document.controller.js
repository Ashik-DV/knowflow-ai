// import asyncHandler from "../utils/asyncHandler.js";
// import ApiResponse from "../utils/ApiResponse.js";
// import { uploadDocument } from "../services/document.service.js";

// export const uploadPDF = asyncHandler(async (req, res) => {
//   if (!req.file) {
//     throw new Error("No PDF uploaded");
//   }

//   const document = await uploadDocument(req.user, req.file);

//   return res.status(201).json(
//     new ApiResponse(
//       201,
//       "PDF uploaded successfully",
//       document
//     )
//   );
// });


import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  uploadDocument,
  getDocuments,
  deleteDocument,
} from "../services/document.service.js";

export const uploadPDF = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new Error("No PDF uploaded");
  }

  const document = await uploadDocument(req.user, req.file);

  return res.status(201).json(
    new ApiResponse(
      201,
      "PDF uploaded successfully",
      document
    )
  );
});

export const getAllDocuments = asyncHandler(async (req, res) => {
  const documents = await getDocuments(req.user);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Documents fetched successfully",
      documents
    )
  );
});

export const removeDocument = asyncHandler(async (req, res) => {
  await deleteDocument(req.user, req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Document deleted successfully"
    )
  );
});