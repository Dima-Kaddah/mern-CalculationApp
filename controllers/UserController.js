const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../helpers/HttpError');
const User = require('../models/User');

//signUp user
const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { name, email, password, role } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  try {
    await createdUser.save();

  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
  const modifiedUser = createdUser.toObject({ getters: true });
  res
    .status(201)
    .json({ userId: modifiedUser.id, email: modifiedUser.email, name: modifiedUser.name, role: modifiedUser.role, token: token });
};

//login user
const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedUser;
  let isPasswordCorrect;
  try {
    // Check if user exists
    identifiedUser = await User.findOne({ email });
    isPasswordCorrect = await bcrypt.compare(
      password,
      identifiedUser.password
    );
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, check your credentials and try again!',
      500
    );
    return next(error);
  }

  if (!identifiedUser || !isPasswordCorrect) {
    const error = new HttpError('Credentials are incorrect!', 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: identifiedUser.id, email: identifiedUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, check your credentials and try again!',
      500
    );
    return next(error);
  }

  const modifiedUser = identifiedUser.toObject({ getters: true });
  res
    .status(200)
    .json({ userId: modifiedUser.id, email: modifiedUser.email, role: modifiedUser.role, name: modifiedUser.name, token });
};


exports.signUp = signUp;
exports.logIn = logIn;