import type { Context } from "hono";

import type { PostUserDto } from "@/types/user";

import { createUser, getAllUsers } from "@/services/user.service";

export const getUsers = async (c: Context) => {
  const users = await getAllUsers();

  return c.json(users);
};

export const postUser = async (c: Context) => {
  const body = await c.req.json<PostUserDto>();

  const user = createUser({
    telegramID: body?.telegramID,
  });

  if (!user) {
    return c.json({ error: "Error creating user" }, 400);
  }

  return c.json(user, 201);
};
