import type { Config } from "drizzle-kit";

import { DATABASE_URL } from "@/config";

export default {
  schema: "./src/db/schemes",
  out: "./drizzle",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: DATABASE_URL,
  },
} satisfies Config;
