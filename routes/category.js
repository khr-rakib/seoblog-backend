const router = require('express').Router();

const { create, list, read, remove } = require('../controllers/category');
const { runValidator } = require('../validators');
const { adminMiddleware, requireSignIn } = require('../controllers/auth');
const { categoryCreateValidator } = require('../validators/category');

router.post('/category', categoryCreateValidator, runValidator, requireSignIn, adminMiddleware, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.delete('/category/:slug', requireSignIn, adminMiddleware, remove);


module.exports = router;