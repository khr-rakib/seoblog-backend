const router = require('express').Router();
const { signUp, signIn, signOut, requireSignIn } = require('../controllers/auth');

// validators
const { runValidator } = require('../validators');
const { signUpValidator, signInValidator } = require('../validators/auth');

router.post('/signUp', signUpValidator, runValidator, signUp);
router.post('/signIn', signInValidator, runValidator, signIn);
router.get('/signOut', signOut);


module.exports = router;
