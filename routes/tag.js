const router = require('express').Router();

const { create, list, read, remove } = require('../controllers/tag');
const { runValidator } = require('../validators');
const { requireSignIn, adminMiddleware } = require('../controllers/auth');
const { tagCreateValidator } = require('../validators/tag');

router.post('/tag', tagCreateValidator, runValidator, requireSignIn, adminMiddleware, create);
router.get('/tags', list);
router.get('/tag/:slug', read);
router.delete('/tag/:slug', requireSignIn, adminMiddleware, remove);


module.exports = router;