import multer from "multer";
import path from "path";
import fs from "fs";

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const IMAGE_DIR = path.join(process.cwd(), "uploads/images");
const PDF_DIR = path.join(process.cwd(), "uploads/pdfs");
const QUIZ_DIR = path.join(process.cwd(), "uploads/quizzes");

ensureDir(IMAGE_DIR);
ensureDir(PDF_DIR);
ensureDir(QUIZ_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") cb(null, IMAGE_DIR);
    else if (file.fieldname === "pdf") cb(null, PDF_DIR);
    else if (file.fieldname === "quiz") cb(null, QUIZ_DIR);
    else cb(null, IMAGE_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`);
  }
});

const upload = multer({ storage });
export default upload;
