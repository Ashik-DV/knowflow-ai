import express from "express";
import { testQdrant } from "../controllers/qdrant.controller.js";

const router = express.Router();

router.get("/test", testQdrant);

export default router;