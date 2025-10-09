import { getLogger } from "@logtape/logtape";

import type { CreateSubscriptionDto } from "@/types/subscription";

import { db } from "@/db/client";
import { subscriptionsTable } from "@/db/schemes/subscriptions";
import { remnawaveClient } from "@/lib/remnawave";

const logger = getLogger(["hono"]);

export const createSubscription = async (dto: CreateSubscriptionDto) => {
  try {
    const subscription = await db
      .insert(subscriptionsTable)
      .values({
        uuid: crypto.randomUUID(),
        userId: dto.userId,
        status: dto.status,
        isTrial: dto.isTrial,
        startDate: dto.startDate,
        endDate: dto.endDate,
        subUrl: dto.subUrl,
        remnawaveUuid: dto.remnawaveUuid,
        remnawaveShortId: dto.remnawaveShortId,
        internalSquadsIds: dto.internalSquadsIds,
      })
      .returning();

    return subscription.at(0);
  } catch (error) {
    logger.error(`Error creating subscription for user with ID ${dto.userId}`);
    console.error(error);

    await remnawaveClient.users.delete({
      uuid: dto.remnawaveUuid,
    });
  }
};
