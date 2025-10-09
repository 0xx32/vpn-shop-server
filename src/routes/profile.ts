import { Hono } from "hono";

import type { UserSelect } from "@/db/schemes/users";

interface Variables {
  user: UserSelect;
}

const profile = new Hono<{ Variables: Variables }>();

profile.get("/me", async (c) => {
  const user = c.get("user");

  return c.json(user, 200);
});

export { profile as profileRoutes };
