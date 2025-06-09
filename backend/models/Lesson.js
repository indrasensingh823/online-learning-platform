const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String, // path to video file
});

module.exports = mongoose.model('Lesson', lessonSchema);
