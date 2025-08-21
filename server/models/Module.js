import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: String,
  description: String,
  videoUrl: String,
  pdf: String,
  quiz: String
});

export default mongoose.model('Module', moduleSchema);
