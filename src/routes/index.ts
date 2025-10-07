import { Hono } from "hono";

import { userRoutes } from "./users";

const routes = new Hono();

routes.route("/users", userRoutes);

export { routes };
