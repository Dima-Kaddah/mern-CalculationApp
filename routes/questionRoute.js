const express = require('express');
const router = express.Router();
const { createQuestion, getQuestionsByLevel } = require('./../controllers/QuestionController');

router.post('/addQuestion', createQuestion);
router.post('/gameQuestions', getQuestionsByLevel);

module.exports = router;