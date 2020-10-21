const express = require('express');
const router = express.Router();
const { signUp, logIn } = require('./../controllers/UserController');
const validateSignup = require('../helpers/validation/validateSignUp');

router.post('/signup', validateSignup, signUp);
router.post('/login', logIn);

module.exports = router;