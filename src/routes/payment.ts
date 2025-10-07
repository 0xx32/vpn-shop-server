import { Hono } from "hono";
import { validator } from "hono-openapi";

import { getPayment, postPayment } from "@/services/payment.service";
import {
  createPaymentDtoSchema,
  getPaymentParamsSchema,
} from "@/utils/constants/payment";

const payments = new Hono();

// Get payment
payments.get("/:id", validator("param", getPaymentParamsSchema), async (c) => {
  const params = c.req.valid("param");

  const payment = await getPayment(+params.id);

  if (!payment) {
    return c.json({ error: "Payment not found" }, 404);
  }

  return c.json(payment, 200);
});

// Create payment
payments.post("/", validator("json", createPaymentDtoSchema), async (c) => {
  const body = c.req.valid("json");

  const newPayment = await postPayment(body);

  if (!newPayment) {
    return c.json({ error: "Error creating payment" }, 400);
  }

  return c.json(newPayment, 201);
});

export { payments as paymentRoutes };
