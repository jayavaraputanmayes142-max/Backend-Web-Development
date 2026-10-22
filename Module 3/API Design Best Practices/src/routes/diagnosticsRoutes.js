const express = require('express');
const controller = require('../controllers/postController');

/**
 * Demo/testing only: always triggers an internal failure so you can check
 * that the public 500 response is safe (no stack trace, no DB text).
 *
 *   GET /diagnostics/failure
 */
const router = express.Router();

router.get('/failure', controller.simulateFailure);

module.exports = router;
