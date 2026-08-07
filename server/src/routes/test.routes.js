import express from "express";
import { listModels } from "../controllers/test.controller.js";

const router = express.Router();

router.get("/models", listModels);

export default router;