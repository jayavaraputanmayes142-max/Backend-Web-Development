const http = require('../utils/http');

/**
 * Central error handler: the only place errors become responses.
 * - Expected errors (AppError) send their safe code + message.
 * - Malformed JSON bodies become a 400.
 * - Anything else is logged in full on the server, but the client only
 *   gets a generic 500: no stack trace, no DB text, no file paths.
 */
// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
  if (err.isOperational) {
    return http.sendError(res, err.statusCode, err.code, err.message);
  }

  if (err.type === 'entity.parse.failed') {
    return http.sendError(res, 400, 'INVALID_JSON', 'Request body must be valid JSON');
  }

  console.error(`[${req.method} ${req.originalUrl}]`, err);
  return http.sendError(res, 500, 'INTERNAL_ERROR', 'Something went wrong. Please try again later.');
};
