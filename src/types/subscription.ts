import type { SubscriptionStatus } from "@/db/schemes/subscriptions";

export interface CreateSubscriptionDto {
  userId: number;
  status: SubscriptionStatus;
  isTrial: boolean;
  startDate: Date;
  endDate: Date;
  subUrl: string;
  remnawaveUuid: string;
  remnawaveShortId: string;
  internalSquadsIds: string[];
}
