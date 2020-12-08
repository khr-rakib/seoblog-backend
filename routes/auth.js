const router = require('express').Router();
const { signUp } = require('../controllers/auth');

// validators
const { runValidator } = require('../validators');
const { signUpValidator } = require('../validators/auth');

router.post('/signUp', signUpValidator, runValidator, signUp);


module.exports = router;
