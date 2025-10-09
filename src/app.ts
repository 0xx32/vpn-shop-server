import { getLogger } from "@logtape/logtape";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { showRoutes } from "hono/dev";

import { authMiddleware } from "./middleware/auth";
// import { loggerMiddleware } from "./middleware/logger";
import { routes } from "./routes";
import { authRoutes } from "./routes/auth";

const logger = getLogger(["hono"]);

const app = new Hono();

// app.use("*", loggerMiddleware);
app.use(
  cors({
    origin: "*",
  }),
);

app.use("/api/*", authMiddleware);

app.route("/auth", authRoutes);
app.route("/api", routes);

app.notFound((c) => c.json({ error: "Not Found" }, 404));

app.onError((err, c) => {
  logger.error("Request error", {
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
    method: c.req.method,
    url: c.req.url,
  });

  return c.json({ error: "Internal server error" }, 500);
});

showRoutes(app);
export { app };
