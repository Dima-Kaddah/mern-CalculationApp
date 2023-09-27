const Questions = require('../models/Questions');
const HttpError = require('./../helpers/HttpError.js');
const bcrypt = require('bcryptjs');

const checkAnswer = async (req, res, next) => {

  const { _id, triesCount, rightCount, answer } = req.body;

  let existQuestion;
  try {
    existQuestion = await Questions.findOne({ _id });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, Question alreaady exist!',
      500
    );
    return next(error);
  }
  if (!existQuestion) {
    const error = new HttpError(
      'you can try again',
      422
    );
    return next(error);
  }

  let isValidAnswer;
  try {
    toHashAnswer = answer + process.env.BCRYPT_ANSWER;
    isValidAnswer = await bcrypt.compare(toHashAnswer, existQuestion.answer);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500,
    );
    return next(error);
  }

  try {
    existQuestion = await Questions.updateOne({ triesCount: triesCount, rightCount: rightCount });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, Question alreaady exist!',
      500
    );
    return next(error);
  }
  if (!isValidAnswer) {
    return res.json({ triesCount, rightCount, answer: false });
  }

  res.json({ triesCount, rightCount, answer: true });

};

exports.checkAnswer = checkAnswer;
