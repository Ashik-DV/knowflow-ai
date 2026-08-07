import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "src/uploads/documents");
  },

  filename(req, file, cb) {
    const extension = path.extname(file.originalname);

    cb(null, `${uuid()}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;