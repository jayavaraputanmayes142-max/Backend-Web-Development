/**
 * An expected, client-facing failure.
 * `code` is a stable machine-readable string clients can branch on;
 * `message` is safe to show to a client.
 */
class AppError extends Error {
  constructor(statusCode, code, message) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
  }
}

module.exports = AppError;
