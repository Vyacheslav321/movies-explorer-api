const rateLimit = require('express-rate-limit');
const { RATE_LIMIT } = require('../utils/errors');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: RATE_LIMIT,
});

module.exports = limiter;
