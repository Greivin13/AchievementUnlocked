const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js')
const commentRoutes = require('./comment-routes.js');
const reviewRoutes = require('./review-routes.js');
const revCommentRoutes = require('./revComment-routes.js')

router.use('/users', userRoutes);
router.use('/discussion', postRoutes);
router.use('/comments', commentRoutes);
router.use('/profile', reviewRoutes);
router.use('/revComments', revCommentRoutes);

module.exports = router;