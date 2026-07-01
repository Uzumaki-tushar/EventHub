const redisClient = require("../config/redis");

const cache = (keyPrefix) => {
  return async (req, res, next) => {
    // Skip if Redis is not connected yet
    if (!redisClient.isOpen) {
      return next();
    }

    try {
      const key = `${keyPrefix}:${req.originalUrl}`;
      const cachedData = await redisClient.get(key);

      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
      
      // Patch res.json to cache the response before sending it
      const originalJson = res.json.bind(res);
      res.json = (body) => {
        // Cache the response for 1 hour (3600 seconds)
        redisClient.setEx(key, 3600, JSON.stringify(body));
        originalJson(body);
      };
      
      next();
    } catch (err) {
      console.error("Redis Cache Error:", err);
      next();
    }
  };
};

const clearCache = async (keyPrefix) => {
  if (!redisClient.isOpen) return;
  
  try {
    const keys = await redisClient.keys(`${keyPrefix}:*`);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (err) {
    console.error("Redis Clear Cache Error:", err);
  }
};

module.exports = { cache, clearCache };
