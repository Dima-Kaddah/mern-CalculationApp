const express = require('express');
const router = express.Router();
const { createQuestion, getQuestionsByLevel, getAllQuestions } = require('./../controllers/QuestionController');

router.post('/addQuestion', createQuestion);
router.post('/gameQuestions', getQuestionsByLevel);
router.get('/allQuestions', getAllQuestions);


module.exports = router;