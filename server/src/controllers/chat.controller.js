import asyncHandler from "../utils/asyncHandler.js";
import { chatService } from "../services/chat.service.js";

export const chatWithDocument = asyncHandler(async (req, res) => {
  const { question } = req.body;

  const answer = await chatService(req.user, question);

  return res.status(200).json({
    success: true,
    answer,
  });
});