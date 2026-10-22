const express = require('express');
const controller = require('../controllers/postController');

/**
 * Resource: posts. The HTTP method carries the action; the URI names the resource.
 *
 *   GET  /posts              list posts (paginated: ?page=1&limit=2)
 *   GET  /posts/:id          fetch one post
 *   POST /posts              create a post
 *   POST /posts/:id/likes    add a like to a post
 */
const router = express.Router();

router.get('/', controller.listPosts);
router.post('/', controller.createPost);
router.get('/:id', controller.getPost);
router.post('/:id/likes', controller.likePost);

module.exports = router;
