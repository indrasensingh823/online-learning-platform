const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

router.get('/', async (req, res) => {
  const quiz = await Quiz.find();
  res.json(quiz);
});

router.post('/', async (req, res) => {
  const { question, options, correctAnswer } = req.body;
  const newQuiz = await Quiz.create({ question, options, correctAnswer });
  res.json(newQuiz);
});

module.exports = router;
