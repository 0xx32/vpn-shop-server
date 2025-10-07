import { getLogger } from "@logtape/logtape";
import { eq } from "drizzle-orm";

import type { CreatePaymentDto } from "@/types/payment";

import { db } from "@/db/client";
import { paymentsTable } from "@/db/schemes/payments";

const logger = getLogger(["hono"]);

export const postPayment = async (dto: CreatePaymentDto) => {
  try {
    const payment = await db
      .insert(paymentsTable)
      .values({
        method: dto.paymentMethod,
        userId: dto.payerId,
        amount: dto.amount,
        comment: dto.comment,
      })
      .returning();

    return payment.at(0);
  } catch (error) {
    logger.error("Error creating payment");
    console.error(error);
  }
};

export const getPayment = async (paymentId: number) => {
  try {
    const payment = await db
      .select()
      .from(paymentsTable)
      .where(eq(paymentsTable.id, paymentId));

    return payment.at(0);
  } catch (error) {
    logger.error("Error getting payment");
    console.error(error);
  }
};
