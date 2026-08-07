import asyncHandler from "../utils/asyncHandler.js";
import { getQdrantClient } from "../config/qdrant.js";

export const testQdrant = asyncHandler(async (req, res) => {
  try {
    const qdrant = getQdrantClient();

    console.log("Testing Qdrant connection...");

    const result = await qdrant.getCollections();

    console.log("Connected!");

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Qdrant Error:");
    console.error(error);
    console.error("Cause:", error.cause);

    res.status(500).json({
      success: false,
      message: error.message,
      cause: error.cause?.message || null,
    });
  }
});