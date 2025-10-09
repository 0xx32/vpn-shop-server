import type { Context, Next } from "hono";

import { getUserByUniqueID } from "@/services/user.service";

export const setUserUniqueIdMiddleware = async (c: Context, next: Next) => {
  const userUniqueID = c.req.param("userUniqueID");

  if (!userUniqueID) {
    return c.json({ error: "User uniqueID required" }, 401);
  }

  const user = await getUserByUniqueID(userUniqueID);

  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  c.set("user", user);

  await next();
};
