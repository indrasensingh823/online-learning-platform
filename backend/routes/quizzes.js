const express = require('express');
const Quiz = require('../models/Quiz');

const router = express.Router();

// Get quiz by lessonId
router.get('/:lessonId', async (req, res) => {
  const quiz = await Quiz.findOne({ lessonId: req.params.lessonId });
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  res.json(quiz);
});

// Create quiz for lesson
router.post('/', async (req, res) => {
  const { lessonId, questions } = req.body;
  const existingQuiz = await Quiz.findOne({ lessonId });
  if (existingQuiz) return res.status(400).json({ message: 'Quiz already exists for this lesson' });

  const quiz = new Quiz({ lessonId, questions });
  await quiz.save();
  res.json({ message: 'Quiz created', quiz });
});

module.exports = router;
