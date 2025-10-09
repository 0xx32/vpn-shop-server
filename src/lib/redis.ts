import Redis from "ioredis";

export const redis = new Redis({
  host: "localhost",
  port: 6379,
  // или строка подключения:
  // url: 'redis://localhost:6379'
});

redis.on("error", (err) => {
  console.error("ioredis error:", err);
});
