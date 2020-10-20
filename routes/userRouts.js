const express = require('express');
const router = express.Router();
const { signUp } = require('./../controllers/UserController');

router.post('/signup', signUp);
// router.post('/login', logIn);

module.exports = router;