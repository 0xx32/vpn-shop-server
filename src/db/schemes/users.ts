import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uniqueID: text().unique().notNull(),
  telegramID: text().unique(),
  ballance: integer().default(0).notNull(),
  lang: text().$type<"ru" | "en">().default("ru"),
});

export type UserInsert = typeof usersTable.$inferInsert;
export type UserSelect = typeof usersTable.$inferSelect;
