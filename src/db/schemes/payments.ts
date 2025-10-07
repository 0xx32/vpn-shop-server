import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { timestamps } from "../helpers/comlum";
import { usersTable } from "./users";

export const paymentMethodsEnumValues = ["lolz"] as const;
export const paymentMethodsEnum = pgEnum(
  "payment_system",
  paymentMethodsEnumValues,
);

export const statusPaymentEnumValues = [
  "paid",
  "not_paid",
  "canceled",
] as const;
export const statusPaymentEnum = pgEnum(
  "status_payment",
  statusPaymentEnumValues,
);

export type PaymentMethods = (typeof paymentMethodsEnumValues)[number];
export type PaymentStatus = (typeof statusPaymentEnumValues)[number];

export const paymentsTable = pgTable("payments_table", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  method: paymentMethodsEnum().notNull(),
  externalId: text(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  amount: integer().notNull(),
  comment: text(),
  date: timestamp(),
  status: statusPaymentEnum().default("not_paid"),

  ...timestamps,
});

export const paymentsRelation = relations(paymentsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [paymentsTable.userId],
    references: [usersTable.id],
  }),
}));
