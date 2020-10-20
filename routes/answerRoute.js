const express = require('express');
const router = express.Router();
const { checkAnswer } = require('./../controllers/AnswerController');

router.put('/checkAnswer', checkAnswer);

module.exports = router;

