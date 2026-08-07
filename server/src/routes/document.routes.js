// import express from "express";
// import { uploadPDF } from "../controllers/document.controller.js";
// import upload from "../middleware/upload.middleware.js";
// import { verifyJWT } from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.post(
//   "/upload",
//   verifyJWT,
//   upload.single("document"),
//   uploadPDF
// );

// export default router;

import express from "express";
import {
  uploadPDF,
  getAllDocuments,
  removeDocument,
} from "../controllers/document.controller.js";

import upload from "../middleware/upload.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/upload",
  verifyJWT,
  upload.single("document"),
  uploadPDF
);

router.get(
  "/",
  verifyJWT,
  getAllDocuments
);

router.delete(
  "/:id",
  verifyJWT,
  removeDocument
);

export default router;