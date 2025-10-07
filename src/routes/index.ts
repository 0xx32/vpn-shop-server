import { Hono } from "hono";

import { paymentRoutes } from "./payment";
import { userRoutes } from "./users";

const routes = new Hono();

routes.route("/users", userRoutes);
routes.route("/payments", paymentRoutes);

export { routes };
