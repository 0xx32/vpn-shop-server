import z from "zod";

import { paymentMethodsEnumValues } from "@/db/schemes/payments";

export const createPaymentDtoSchema = z.object({
  payerId: z.number(),
  amount: z.number(),
  paymentMethod: z.enum(paymentMethodsEnumValues),
  comment: z.string().optional(),
});

export const getPaymentParamsSchema = z.object({
  id: z.string(),
});
