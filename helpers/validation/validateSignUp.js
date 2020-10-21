const { check } = require('express-validator');

const validateSignup = [
  check('name').isLength({ min: 3 }),
  check('email').isEmail(),
  check('password').isAlphanumeric(),
];

module.exports = validateSignup;