const Questions = require('../models/Questions');
const HttpError = require('./../helpers/HttpError.js');
const bcrypt = require('bcryptjs');

const createQuestion = async (req, res, next) => {

  const { index, question, answer } = req.body;

  let existQuestion;
  try {
    existQuestion = await Questions.findOne({ index });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, Question alreaady exist!',
      500
    );
    return next(error);
  }
  if (existQuestion) {
    const error = new HttpError(
      'Question already exists, please insert new Question!',
      422
    );
    return next(error);
  }

  let hashedAnswer;
  try {
    toHashAnswer = answer + process.env.BCRYPT_ANSWER;
    hashedAnswer = await bcrypt.hash(toHashAnswer, 10);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500,
    );
    return next(error);
  }

  const NewQuestion = new Questions({
    index,
    question,
    answer: hashedAnswer,
  });

  try {
    // Save question
    await NewQuestion.save();
  } catch (err) {
    const error = new HttpError(err);
    return next(error);
  }

  res.status(201).json({ NewQuestion });
};

//get all questions
const getQuestions = async (req, res, next) => {
  let questions;

  try {
    questions = await Questions.find({}, '-answer');
    // const randomNum = Math.floor(Math.random() * 5);
    // const get5Question = questions.splice(randomNum, 1);
    res.status(200).json(questions);

  } catch (err) {
    const error = new HttpError(err);
    return next(error);
  }
};

exports.createQuestion = createQuestion;
exports.getQuestions = getQuestions;
