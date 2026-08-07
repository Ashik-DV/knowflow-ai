import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { chatWithDocument } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", verifyJWT, chatWithDocument);

export default router;