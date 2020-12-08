const router = require('express').Router();
const { signUp } = require('../controllers/auth');


router.post('/signUp', signUp);


module.exports = router;
