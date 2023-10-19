const rateLimit = require('express-rate-limit');

const limiterConfig = {
  windowMs: 60 * 1000,
  max: 100,
  message: 'Превышен лимит запросов',
};

const limiter = rateLimit(limiterConfig);

module.exports = limiter;
