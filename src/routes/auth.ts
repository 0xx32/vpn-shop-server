import { Hono } from "hono";
import { v4 as uuidv4 } from "uuid";

import type { TelegramUser } from "@/types/telegram";

import { config } from "@/config";
import { redis } from "@/lib/redis";
import { createUser, getUserByTelegramID } from "@/services/user.service";
import { validateInitData } from "@/utils/telegram/validateInitData";

const DAY_TIMESTAMP = 24 * 60 * 60;

const auth = new Hono();

auth.post("/login", async (c) => {
  const { initData } = await c.req.json<{ initData: string }>();

  if (!validateInitData(initData, config.BOT_TOKEN)) {
    return c.json({ error: "Invalid initData" }, 401);
  }

  // Извлекаем данные пользователя
  const params = new URLSearchParams(initData);
  const userJson = params.get("user");
  const telegramUser = userJson
    ? (JSON.parse(decodeURIComponent(userJson)) as TelegramUser)
    : null;

  if (!telegramUser) {
    return c.json({ error: "Invalid initData" }, 401);
  }

  let user = await getUserByTelegramID(telegramUser.id);

  if (!user) {
    const newUser = await createUser({
      telegramID: telegramUser.id,
    });

    user = newUser;
  }

  if (!user) {
    return c.json({ error: "Error getting user or creating user" }, 400);
  }

  const sessionId = uuidv4();
  await redis.setex(
    `sess:${sessionId}`,
    config.SESSION_LIFETIME * DAY_TIMESTAMP,
    JSON.stringify({ userId: user.id }),
  );

  return c.json({ sessionId });
});

export { auth as authRoutes };
