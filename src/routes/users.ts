import { Hono } from "hono";

import { getUsers, postUser } from "@/handlers/user.handlers";

const users = new Hono();

users.get("/", getUsers);
users.post("/", postUser);

export { users as userRoutes };
