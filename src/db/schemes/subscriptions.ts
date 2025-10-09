import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { timestamps } from "../helpers/comlum";
import { usersTable } from "./users";

export const subscriptionStatusEnumValues = [
  "ACTIVE",
  "DISABLED",
  "EXPIRED",
] as const;
export const subscriptionStatusEnum = pgEnum(
  "subscription_status",
  subscriptionStatusEnumValues,
);

export type SubscriptionStatus = (typeof subscriptionStatusEnumValues)[number];

export const subscriptionsTable = pgTable("subscriptions_table", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uuid: text().notNull().unique(),
  userId: integer().notNull(),
  status: subscriptionStatusEnum().default("DISABLED"),
  isTrial: boolean().default(false),
  startDate: timestamp().defaultNow().notNull(),
  endDate: timestamp().notNull(),
  subUrl: text().notNull(),
  remnawaveUuid: text().notNull(),
  remnawaveShortId: text().notNull(),
  internalSquadsIds: text().array().notNull(),
  ...timestamps,
});

export type SubscriptionSelect = typeof subscriptionsTable.$inferSelect;
export type SubscriptionInsert = typeof subscriptionsTable.$inferInsert;

export const subscriptionsRelations = relations(
  subscriptionsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [subscriptionsTable.userId],
      references: [usersTable.id],
    }),
  }),
);
