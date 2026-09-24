const config = require('./../config');

// Central error handler — the last middleware registered in app.js.
module.exports = function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const body = { error: err.message || 'Internal Server Error' };

  // Validation errors carry the express-validator details array.
  if (err.details) {
    body.details = err.details;
  }

  // Only leak stack traces outside production.
  if (config.nodeEnv !== 'production' && err.stack) {
    body.stack = err.stack;
  }

  res.status(status).json(body);
};