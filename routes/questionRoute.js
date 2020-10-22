const express = require('express');
const router = express.Router();
const { createQuestion, getQuestions } = require('./../controllers/QuestionController');

router.post('/addQuestion', createQuestion);
router.post('/allQuestions', getQuestions);

module.exports = router;