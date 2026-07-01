const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis").default || require("rate-limit-redis");
const redisClient = require("../config/redis");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: async (...args) => {
      try {
        return await redisClient.sendCommand(args);
      } catch (err) {
        if (err.name === 'TimeoutError' || err.name === 'ConnectionTimeoutError') return;
        throw err;
      }
    },
  }),
  message: { message: "Too many requests from this IP, please try again after 15 minutes" },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per window for auth (login/register)
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: async (...args) => {
      try {
        return await redisClient.sendCommand(args);
      } catch (err) {
        if (err.name === 'TimeoutError' || err.name === 'ConnectionTimeoutError') return;
        throw err;
      }
    },
  }),
  message: { message: "Too many auth attempts from this IP, please try again after 15 minutes" },
});

module.exports = { apiLimiter, authLimiter };
