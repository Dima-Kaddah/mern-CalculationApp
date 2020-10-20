// const Questions = require('../models/Questions');
const User = require('./../models/User');
// const HttpError = require('./../helpers/HttpError.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// signup user

const signUp = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new HttpError('Make sure to pass in the correct data!', 422);
  //   return next(error);
  // }
  const { name, password } = req.body;

  let nameExists;
  try {
    // Check if email already exists
    nameExists = await User.findOne({ name });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not create user!',
      500
    );
    return next(error);
  }

  if (nameExists) {
    const error = new HttpError(
      'Name already exists, please login instead!',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    // Hash password
    hashedPassword = await hashPassword(password);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not create user!',
      500
    );
    return next(error);
  }

  if (!hashedPassword || hashedPassword === password) {
    const error = new HttpError(
      'Something went wrong, could not hash password!',
      500
    );
    return next(error);
  }

  // Create new user
  const newUser = new User({
    name,
    password: hashedPassword,
  });

  let token;
  try {
    // Save user
    await newUser.save();

    // Create an authentication token
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not create user!',
      500
    );
    return next(error);
  }

  const modifiedUser = newUser.toObject({ getters: true });

  res
    .status(201)
    .json({ userId: modifiedUser.id, name: modifiedUser.name, token });
};

exports.signUp = signUp;
// exports.logIn = logIn;
