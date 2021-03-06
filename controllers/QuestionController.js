const Questions = require('../models/Questions');
const HttpError = require('./../helpers/HttpError.js');
const bcrypt = require('bcryptjs');

const createQuestion = async (req, res, next) => {

  const { index, question, answer, role } = req.body;

  let existQuestion;
  try {
    existQuestion = await Questions.findOne({ question });
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

  let existIndex;
  try {
    existIndex = await Questions.findOne({ index, role });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, question number (index) alreaady exist!',
      500
    );
    return next(error);
  }
  if (existIndex) {
    const error = new HttpError(
      'Number already exists, please insert new Question Number!',
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
    role
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

// get levels questions
const getQuestionsByLevel = async (req, res, next) => {

  const { role } = req.body;

  let questions;

  try {
    questions = await Questions.find({ role }, '-answer');
    const only5Questions = questions.slice(0, 5);
    // const get5Question = questions.splice(randomNum, 1);
    res.status(200).json(only5Questions);

  } catch (err) {
    const error = new HttpError(err);
    return next(error);
  }
};

// // get all questions
const getAllQuestions = async (req, res, next) => {
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
exports.getQuestionsByLevel = getQuestionsByLevel;
exports.getAllQuestions = getAllQuestions;