import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import AutoRout from './routes/auth.js'
import courseRoutes from "./routes/courseRoutes.js";
import adminAuthRoutes from "./routes/adminAuth.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create upload folders if they don't exist
const uploadFolders = ["uploads", "uploads/images", "uploads/pdfs", "uploads/quizzes"];
uploadFolders.forEach(folder => {
  if (!fs.existsSync(path.join(__dirname, folder))) {
    fs.mkdirSync(path.join(__dirname, folder), { recursive: true });
  }
});

// Static file serving
app.use("/images", express.static(path.join(__dirname, "uploads/images")));
app.use("/pdfs", express.static(path.join(__dirname, "uploads/pdfs")));
app.use("/quizzes", express.static(path.join(__dirname, "uploads/quizzes")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', AutoRout); // register & login routes
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminAuthRoutes);


// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000"));
