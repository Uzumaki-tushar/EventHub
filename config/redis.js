const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URI || "redis://127.0.0.1:6379",
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Connected to Redis"));

redisClient.connect().catch(console.error);

module.exports = redisClient;
