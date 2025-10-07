import { getLogger } from "@logtape/logtape";

import { closeDbConnection, testDbConnection } from "@/db/helper";

import { app } from "./app";
import { config } from "./config";
import { loggerInitializer } from "./utils/logger";

let server: ReturnType<typeof Bun.serve> | null = null;

const logger = getLogger(["hono"]);

async function start() {
  try {
    await testDbConnection();

    server = Bun.serve({
      port: config.APP_PORT,
      fetch: app.fetch,
    });
  } catch (error) {
    console.error("💥 Fatal error during startup:", error);
    process.exit(1);
  }
}

async function gracefulShutdown() {
  console.warn("\n🛑 Shutting down gracefully...");

  if (server) {
    server.stop(true);
    logger.info`🔌 HTTP server stopped`;
  }

  try {
    await closeDbConnection();
    logger.info`🔌 PostgreSQL connection closed`;
  } catch (err) {
    console.error("Error closing DB connection:", err);
  }

  process.exit(0);
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

loggerInitializer();
start();
