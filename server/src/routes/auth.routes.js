import express from "express";
import {
  registerCompanyAdmin,
  loginUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register-admin", registerCompanyAdmin);
router.post("/login", loginUser);

export default router;