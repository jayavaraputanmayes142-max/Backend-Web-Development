const store = require('../data/postStore');
const AppError = require('../utils/AppError');
const { parsePagination, paginate } = require('../utils/pagination');

function listPosts(query = {}) {
  const pagination = parsePagination(query);
  return paginate(store.getAllPosts(), pagination);
}

function getPost(id) {
  const post = store.getPostById(id);
  if (!post) {
    throw new AppError(404, 'NOT_FOUND', 'Post not found');
  }
  return post;
}

function createPost(body = {}) {
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const author = typeof body.author === 'string' ? body.author.trim() : '';

  if (!title || !author) {
    throw new AppError(400, 'VALIDATION_ERROR', 'title and author are required strings');
  }

  return store.createPost({ title, author });
}

function likePost(id) {
  const post = store.incrementLikes(id);
  if (!post) {
    // A missing post is the client's problem (404), not a server crash (500).
    throw new AppError(404, 'NOT_FOUND', 'Post not found');
  }
  return post;
}

/**
 * Demo-only: simulates an unexpected internal failure.
 * The detailed message stays in the server logs; the client only
 * ever sees the generic error envelope from the error handler.
 */
function simulateFailure() {
  throw new Error('SQLITE_CONSTRAINT in posts table');
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  likePost,
  simulateFailure
};
