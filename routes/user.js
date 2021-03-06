const router = require('express').Router();
const { requireSignIn, authMiddleware } = require('../controllers/auth');
const { read } = require('../controllers/user');


router.get('/profile', requireSignIn, authMiddleware, read);

module.exports = router;