const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  completedVideos: [String],
  score: Number,
});

module.exports = mongoose.model('Progress', progressSchema);
