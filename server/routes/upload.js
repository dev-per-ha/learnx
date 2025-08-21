import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/images/');
    } else if (file.originalname.endsWith('.pdf')) {
      cb(null, 'uploads/pdfs/');
    } else {
      cb(null, 'uploads/quizzes/');
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

const upload = multer({ storage });

// File upload route
router.post('/file', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const subfolder = req.file.path.split(path.sep)[1]; // 'images', 'pdfs', or 'quizzes'
  res.status(200).json({
    url: `/uploads/${subfolder}/${req.file.filename}`
  });
});

export default router;
