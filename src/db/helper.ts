import { getLogger } from "@logtape/logtape";

import { client } from "./client";

const logger = getLogger(["db"]);

export async function testDbConnection() {
  try {
    await client`SELECT 1`;
    logger.info`✅ Connected to PostgreSQL`;
  } catch (error) {
    console.error("❌ Failed to connect to PostgreSQL:", error);
    throw error;
  }
}

export async function closeDbConnection() {
  await client.end();
}
