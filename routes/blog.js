const router = require('express').Router();
const { create, list, listAllBlogCategoriesTags, read, remove, update, photo, listRelated } = require('../controllers/blog');

// validators
const { adminMiddleware, requireSignIn } = require('../controllers/auth');
const { categoryCreateValidator } = require('../validators/category');

router.get('/blog/photo/:slug', photo);

router.post('/blog', requireSignIn, adminMiddleware, create);
router.get('/blogs', list);
router.post('/blogs-categories-tags', listAllBlogCategoriesTags);
router.get('/blog/:slug', read);
router.delete('/blog/:slug', requireSignIn, adminMiddleware, remove);
router.put('/blog/:slug', requireSignIn, adminMiddleware, update);

router.post('/blogs/related/', listRelated);

module.exports = router;