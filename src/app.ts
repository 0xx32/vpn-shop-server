import { getLogger } from "@logtape/logtape";
import { Hono } from "hono";

// import { loggerMiddleware } from "./middleware/logger";
import { routes } from "./routes";

const logger = getLogger(["hono"]);

const app = new Hono();

// app.use("*", loggerMiddleware);

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

export { app };
