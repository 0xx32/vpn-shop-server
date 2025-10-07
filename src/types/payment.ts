import type { PaymentMethods } from "@/db/schemes/payments";

export interface CreatePaymentDto {
  payerId: number;
  amount: number;
  paymentMethod: PaymentMethods;
  comment?: string;
}
