import { Hono } from "hono";
import { validator } from "hono-openapi";

import { createUser, getAllUsers } from "@/services/user.service";
import { createUserDtoSchema } from "@/utils/constants/user";

const users = new Hono();

// Get all users
users.get("/", async (c) => {
  const users = await getAllUsers();

  return c.json(users, 200);
});

// Create user
users.post("/", validator("json", createUserDtoSchema), async (c) => {
  const body = c.req.valid("json");

  const user = await createUser({
    telegramID: body?.telegramID,
  });

  if (!user) {
    return c.json({ error: "Error creating user" }, 400);
  }

  return c.json(user, 201);
});

export { users as userRoutes };
