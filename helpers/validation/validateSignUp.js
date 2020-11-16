const { check } = require('express-validator');

const validateSignup = [
  check('name').not().isEmpty().isLength({ min: 3 }),
  check('email').isEmail().normalizeEmail(),
  check('password').isLength({ min: 6 }),
];

module.exports = validateSignup;