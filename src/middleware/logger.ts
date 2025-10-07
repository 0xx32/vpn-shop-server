import type { Context, Next } from "hono";

import { getLogger, withContext } from "@logtape/logtape";

const logger = getLogger(["hono"]);

export const loggerMiddleware = async (c: Context, next: Next) => {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  await withContext(
    {
      requestId,
      method: c.req.method,
      url: c.req.url,
      userAgent: c.req.header("User-Agent"),
      ipAddress:
        c.req.header("CF-Connecting-IP") || c.req.header("X-Forwarded-For"),
    },
    async () => {
      logger.info("Request started", {
        method: c.req.method,
        url: c.req.url,
        requestId,
      });

      await next();

      const duration = Date.now() - startTime;
      logger.info("Request completed", {
        status: c.res.status,
        duration,
        requestId,
      });
    },
  );
};
