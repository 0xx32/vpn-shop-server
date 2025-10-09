import type { Context, Next } from "hono";

import { redis } from "@/lib/redis";
import { getUserByID } from "@/services/user.service";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  const sessionId =
    authHeader?.replace("Bearer ", "") || c.req.query("session_id");

  if (!sessionId) {
    return c.json({ error: "Session ID required" }, 401);
  }

  const sessionData = await redis.get(`sess:${sessionId}`);
  if (!sessionData) {
    return c.json({ error: "Invalid or expired session" }, 401);
  }

  const { userId } = JSON.parse(sessionData);
  const user = await getUserByID(userId);

  if (!user) {
    return c.json({ error: "User not found" }, 401);
  }

  c.set("user", user);
  await next();
};
