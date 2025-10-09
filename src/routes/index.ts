import { Hono } from "hono";

import { paymentRoutes } from "./payment";
import { profileRoutes } from "./profile";
import { userRoutes } from "./users";

const routes = new Hono();

routes.route("/profile", profileRoutes);
routes.route("/users", userRoutes);
routes.route("/payments", paymentRoutes);

export { routes };
