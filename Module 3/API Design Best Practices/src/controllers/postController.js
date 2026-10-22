/**
 * Controllers are thin: read the request, call one service method, send the
 * standard envelope. Failures are thrown and handled centrally in errorHandler.
 */
const service = require('../services/postService');
const http = require('../utils/http');

function listPosts(req, res) {
  const { data, meta } = service.listPosts(req.query);
  return http.sendList(res, data, meta);
}

function getPost(req, res) {
  const post = service.getPost(req.params.id);
  return http.sendData(res, 200, post);
}

function createPost(req, res) {
  const post = service.createPost(req.body);
  res.location(`/posts/${post.id}`);
  return http.sendData(res, 201, post);
}

function likePost(req, res) {
  const post = service.likePost(req.params.id);
  return http.sendData(res, 200, post);
}

function simulateFailure(req, res) {
  service.simulateFailure();
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  likePost,
  simulateFailure
};
