const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

router.get('/', async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

router.post('/', async (req, res) => {
  const { title, description, videoUrl } = req.body;
  const video = await Video.create({ title, description, videoUrl });
  res.json(video);
});

module.exports = router;
