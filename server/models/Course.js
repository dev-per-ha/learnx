import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  videoUrl: String,
  pdfUrl: String,
  quizUrl: String
}, { timestamps: true });

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  modules: [ModuleSchema]
}, { timestamps: true });

const Course = mongoose.model("Course", CourseSchema);
export default Course;
