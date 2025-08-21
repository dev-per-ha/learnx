import express from "express";
import Course from "../models/Course.js";
import upload from "../middleware/upload.js";
import fs from "fs";
import path from "path";

const router = express.Router();


const deleteFile = (filepath) => {
  if (!filepath) return;
  const absolutePath = path.join(process.cwd(), filepath);
  try {
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      console.log(`Deleted file at ${absolutePath}`);
    }
  } catch (err) {
    console.error(`Failed to delete file at ${absolutePath}`, err);
  }
};

// Create course
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : "";
    const course = new Course({ title, description, imageUrl });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Get single course with modules
router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
});

// Update course
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Not found" });

    if (req.file) {
      if (course.imageUrl) deleteFile(course.imageUrl);
      course.imageUrl = `/uploads/images/${req.file.filename}`;
    }
    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete course
router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (course?.imageUrl) deleteFile(course.imageUrl);
  course?.modules.forEach((m) => {
    if (m.pdfUrl) deleteFile(m.pdfUrl);
    if (m.quizUrl) deleteFile(m.quizUrl);
  });
  res.json({ message: "Deleted" });
});

// Add module
router.post(
  "/:id/modules",
  upload.fields([{ name: "pdf" }, { name: "quiz" }]),
  async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Not found" });

    const moduleObj = {
      title: req.body.title,
      description: req.body.description,
      videoUrl: req.body.videoUrl,
      pdfUrl: req.files?.pdf ? `/uploads/pdfs/${req.files.pdf[0].filename}` : "",
      quizUrl: req.files?.quiz ? `/uploads/quizzes/${req.files.quiz[0].filename}` : ""
    };

    course.modules.push(moduleObj);
    await course.save();
    res.status(201).json(course);
  }
);

// Update module
router.put(
  "/:id/modules/:moduleId",
  upload.fields([{ name: "pdf" }, { name: "quiz" }]),
  async (req, res) => {
    const course = await Course.findById(req.params.id);
    const module = course?.modules.id(req.params.moduleId);
    if (!module) return res.status(404).json({ error: "Not found" });

    if (req.files?.pdf) {
      if (module.pdfUrl) deleteFile(module.pdfUrl);
      module.pdfUrl = `/uploads/pdfs/${req.files.pdf[0].filename}`;
    }
    if (req.files?.quiz) {
      if (module.quizUrl) deleteFile(module.quizUrl);
      module.quizUrl = `/uploads/quizzes/${req.files.quiz[0].filename}`;
    }

    module.title = req.body.title || module.title;
    module.description = req.body.description || module.description;
    module.videoUrl = req.body.videoUrl || module.videoUrl;

    await course.save();
    res.json(course);
  }
);

router.delete("/:id/modules/:moduleId", async (req, res) => {
  try {
    console.log("Delete module route called");
    console.log("Course ID:", req.params.id);
    console.log("Module ID:", req.params.moduleId);

    const course = await Course.findById(req.params.id);
    if (!course) {
      console.log("Course not found");
      return res.status(404).json({ error: "Course not found" });
    }

    const module = course.modules.id(req.params.moduleId);
    if (!module) {
      console.log("Module not found");
      return res.status(404).json({ error: "Module not found" });
    }

    if (module.pdfUrl) {
      try {
        deleteFile(module.pdfUrl);
      } catch (err) {
        console.error("Error deleting PDF file:", err);
      }
    }

    if (module.quizUrl) {
      try {
        deleteFile(module.quizUrl);
      } catch (err) {
        console.error("Error deleting Quiz file:", err);
      }
    }

     await  module.deleteOne();

    await course.save();

    console.log("Module deleted successfully");
    return res.json({ message: "Module deleted", course });
  } catch (error) {
    console.error("Error in delete module route:", error);
    return res.status(500).json({ error: "Server error deleting module" });
  }
});




export default router;
