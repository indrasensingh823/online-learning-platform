const express = require('express');
const Lesson = require('../models/Lesson');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer config for video upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'videos/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Get all lessons
router.get('/', async (req, res) => {
  const lessons = await Lesson.find();
  res.json(lessons);
});

// Upload lesson with video
router.post('/', upload.single('video'), async (req, res) => {
  const { title, description } = req.body;
  const videoUrl = `/videos/${req.file.filename}`;
  const lesson = new Lesson({ title, description, videoUrl });
  await lesson.save();
  res.json({ message: 'Lesson created', lesson });
});

module.exports = router;
