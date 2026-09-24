const { validationResult } = require('express-validator');
const AppError = require('./AppError');

// Checks the result of the express-validator chains.
// On failure, forwards a 422 AppError to the central error handler.
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new AppError('Validation failed', 422);
    err.details = errors.array(); // keep the same "details" the starter returned
    return next(err);
  }
  next();
};